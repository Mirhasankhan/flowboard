"use client";

import {
  useAddNewColumnMutation,
  useDeleteColumnMutation,
  useReorderColumnMutation,
  useUpdateColumnTitleMutation,
} from "@/redux/features/column/column.api";
import {
  useAddNewTaskMutation,
  useDeleteTaskMutation,
  useMoveTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/features/task/task.api";
import { Column } from "@/types/common";
import { Loader2, Plus, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import BoardColumn from "./BoardColumn";
import DeleteConfirmModal from "./DeleteConfirmModal";

interface AllColumnsForBoardProps {
  board: any;
}

interface DraggedTaskInfo {
  taskId: string;
  sourceColumnId: string;
  sourceIndex: number;
}

interface DraggedColumnInfo {
  columnId: string;
  sourceIndex: number;
}

const AllColumnsForBoard = ({ board }: AllColumnsForBoardProps) => {
  const boardDetails = board?.result?.board;
  const boardId = boardDetails?.id;
  const role = board?.result?.role;
  const isEditable = role === "OWNER" || role === "EDITOR";

  // Column Mutations
  const [addNewColumn, { isLoading: isCreatingColumn }] = useAddNewColumnMutation();
  const [updateColumnTitle] = useUpdateColumnTitleMutation();
  const [reorderColumn] = useReorderColumnMutation();
  const [deleteColumn, { isLoading: isDeletingColumn }] = useDeleteColumnMutation();

  // Task Mutations
  const [addNewTask] = useAddNewTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [moveTask] = useMoveTaskMutation();
  const [deleteTask, { isLoading: isDeletingTask }] = useDeleteTaskMutation();

  // Local state for optimistic drag-and-drop updates
  const [columns, setColumns] = useState<Column[]>([]);

  // Drag tracking refs / state
  const draggedTaskRef = useRef<DraggedTaskInfo | null>(null);
  const draggedColumnRef = useRef<DraggedColumnInfo | null>(null);

  // New Column composer state
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  // Delete modal state
  const [deleteModalState, setDeleteModalState] = useState<{
    open: boolean;
    type: "column" | "task";
    id: string;
    title: string;
  }>({
    open: false,
    type: "column",
    id: "",
    title: "",
  });

  // Sync columns with server data
  useEffect(() => {
    if (boardDetails?.columns) {
      setColumns(boardDetails.columns);
    }
  }, [boardDetails?.columns]);

  // ===================== Column Actions =====================

  const handleCreateColumn = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newColumnTitle.trim();
    if (!trimmed || !boardId) return;

    try {
      const res = await addNewColumn({ boardId, title: trimmed }).unwrap();
      toast.success(res?.message || "Column created successfully");
      setNewColumnTitle("");
      setIsAddingColumn(false);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create column");
    }
  };

  const handleUpdateColumnTitle = async (columnId: string, newTitle: string): Promise<boolean> => {
    try {
      await updateColumnTitle({ columnId, title: newTitle }).unwrap();
      toast.success("Column title updated");
      setColumns((prev) =>
        prev.map((col) => (col.id === columnId ? { ...col, title: newTitle } : col)),
      );
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update column title");
      return false;
    }
  };

  const confirmDeleteColumn = (columnId: string) => {
    const col = columns.find((c) => c.id === columnId);
    setDeleteModalState({
      open: true,
      type: "column",
      id: columnId,
      title: col?.title || "this column",
    });
  };

  // ===================== Task Actions =====================

  const handleAddTask = async (columnId: string, title: string): Promise<boolean> => {
    try {
      await addNewTask({ columnId, title }).unwrap();
      toast.success("Task added successfully");
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to add task");
      return false;
    }
  };

  const handleUpdateTaskTitle = async (taskId: string, newTitle: string): Promise<boolean> => {
    try {
      await updateTask({ taskId, title: newTitle }).unwrap();
      toast.success("Task updated");
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          tasks: col.tasks.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t)),
        })),
      );
      return true;
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update task");
      return false;
    }
  };

  const confirmDeleteTask = (taskId: string) => {
    let taskTitle = "this task";
    for (const col of columns) {
      const found = col.tasks.find((t) => t.id === taskId);
      if (found) {
        taskTitle = found.title;
        break;
      }
    }
    setDeleteModalState({
      open: true,
      type: "task",
      id: taskId,
      title: taskTitle,
    });
  };

  // ===================== Delete Confirmation Handler =====================

  const handleConfirmDelete = async () => {
    const { type, id } = deleteModalState;
    if (!id) return;

    try {
      if (type === "column") {
        await deleteColumn(id).unwrap();
        toast.success("Column deleted successfully");
        setColumns((prev) => prev.filter((col) => col.id !== id));
      } else {
        await deleteTask(id).unwrap();
        toast.success("Task deleted successfully");
        setColumns((prev) =>
          prev.map((col) => ({
            ...col,
            tasks: col.tasks.filter((t) => t.id !== id),
          })),
        );
      }
      setDeleteModalState({ open: false, type: "column", id: "", title: "" });
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to delete ${type}`);
    }
  };

  // ===================== Drag and Drop: Columns =====================

  const handleColumnDragStart = (
    e: React.DragEvent,
    columnId: string,
    index: number,
  ) => {
    draggedColumnRef.current = { columnId, sourceIndex: index };
    e.dataTransfer.setData("column-drag", columnId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleColumnDrop = async (targetIndex: number) => {
    const dragInfo = draggedColumnRef.current;
    if (!dragInfo) return;
    draggedColumnRef.current = null;

    const { columnId, sourceIndex } = dragInfo;
    if (sourceIndex === targetIndex) return;

    // Optimistic local update
    const previousColumns = [...columns];
    const newColumns = [...columns];
    const [movedCol] = newColumns.splice(sourceIndex, 1);
    newColumns.splice(targetIndex, 0, movedCol);
    setColumns(newColumns);

    try {
      await reorderColumn({ columnId, targetIndex }).unwrap();
    } catch (err: any) {
      setColumns(previousColumns);
      toast.error(err?.data?.message || "Failed to reorder column");
    }
  };

  // ===================== Drag and Drop: Tasks =====================

  const handleTaskDragStart = (
    e: React.DragEvent,
    taskId: string,
    columnId: string,
    index: number,
  ) => {
    draggedTaskRef.current = { taskId, sourceColumnId: columnId, sourceIndex: index };
    e.dataTransfer.setData("task-drag", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleTaskDropOnColumn = async (
    targetColumnId: string,
    targetIndex?: number,
  ) => {
    const dragInfo = draggedTaskRef.current;
    if (!dragInfo) return;
    draggedTaskRef.current = null;

    const { taskId, sourceColumnId, sourceIndex } = dragInfo;

    // Find source column and target column
    const sourceCol = columns.find((c) => c.id === sourceColumnId);
    const targetCol = columns.find((c) => c.id === targetColumnId);
    if (!sourceCol || !targetCol) return;

    const taskToMove = sourceCol.tasks.find((t) => t.id === taskId);
    if (!taskToMove) return;

    const safeTargetIndex =
      targetIndex !== undefined
        ? Math.min(Math.max(0, targetIndex), targetCol.tasks.length)
        : targetCol.tasks.length;

    // If dropped at identical position in same column, nothing to do
    if (sourceColumnId === targetColumnId && sourceIndex === safeTargetIndex) {
      return;
    }

    // Optimistic local update
    const previousColumns = [...columns];

    setColumns((prev) => {
      const updated = prev.map((col) => {
        if (col.id === sourceColumnId && col.id === targetColumnId) {
          // Reorder within same column
          const newTasks = [...col.tasks];
          const [removed] = newTasks.splice(sourceIndex, 1);
          const adjustedTarget =
            sourceIndex < safeTargetIndex ? safeTargetIndex - 1 : safeTargetIndex;
          newTasks.splice(adjustedTarget, 0, removed);
          return { ...col, tasks: newTasks };
        } else if (col.id === sourceColumnId) {
          // Remove from source column
          return {
            ...col,
            tasks: col.tasks.filter((t) => t.id !== taskId),
          };
        } else if (col.id === targetColumnId) {
          // Insert into target column
          const newTasks = [...col.tasks];
          newTasks.splice(safeTargetIndex, 0, {
            ...taskToMove,
            columnId: targetColumnId,
          });
          return {
            ...col,
            tasks: newTasks,
          };
        }
        return col;
      });
      return updated;
    });

    // Actual index sent to server API
    // If within same column and moved downward, the targetIndex in database siblings (which excludes moving task) is:
    const finalTargetIndex =
      sourceColumnId === targetColumnId && sourceIndex < safeTargetIndex
        ? safeTargetIndex - 1
        : safeTargetIndex;

    try {
      await moveTask({
        taskId,
        targetColumnId,
        targetIndex: finalTargetIndex,
      }).unwrap();
    } catch (err: any) {
      setColumns(previousColumns);
      toast.error(err?.data?.message || "Failed to move task");
    }
  };

  return (
    <div className="relative mt-6">
      {/* Horizontal scrolling canvas */}
      <div className="flex items-start gap-5 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 min-h-[calc(100vh-200px)]">
        {columns.map((col, idx) => (
          <BoardColumn
            key={col.id}
            column={col}
            columnIndex={idx}
            isEditable={isEditable}
            onUpdateColumnTitle={handleUpdateColumnTitle}
            onDeleteColumn={confirmDeleteColumn}
            onAddTask={handleAddTask}
            onUpdateTaskTitle={handleUpdateTaskTitle}
            onDeleteTask={confirmDeleteTask}
            onColumnDragStart={handleColumnDragStart}
            onColumnDrop={handleColumnDrop}
            onTaskDragStart={handleTaskDragStart}
            onTaskDropOnColumn={handleTaskDropOnColumn}
          />
        ))}

        {/* Add New Column Button / Composer */}
        {isEditable && (
          <div className="w-80 shrink-0">
            {isAddingColumn ? (
              <form
                onSubmit={handleCreateColumn}
                className="rounded-2xl border border-blue-500 bg-white p-3.5 shadow-sm dark:border-blue-500 dark:bg-zinc-900"
              >
                <input
                  type="text"
                  autoFocus
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsAddingColumn(false);
                      setNewColumnTitle("");
                    }
                  }}
                  disabled={isCreatingColumn}
                  placeholder="Enter column title..."
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 text-sm text-zinc-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
                />
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={isCreatingColumn || !newColumnTitle.trim()}
                    className="inline-flex items-center gap-1.5 rounded-[9px] bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isCreatingColumn && <Loader2 className="h-3 w-3 animate-spin" />}
                    Add Column
                  </button>
                  <button
                    type="button"
                    disabled={isCreatingColumn}
                    onClick={() => {
                      setIsAddingColumn(false);
                      setNewColumnTitle("");
                    }}
                    className="rounded-[9px] p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsAddingColumn(true)}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300/80 bg-zinc-50/50 p-4 text-sm font-semibold text-zinc-600 transition hover:border-blue-500 hover:bg-blue-50/30 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-400 dark:hover:border-blue-500 dark:hover:text-blue-400"
              >
                <Plus className="h-4 w-4" />
                Add Column
              </button>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={deleteModalState.open}
        onOpenChange={(val) =>
          setDeleteModalState((prev) => ({ ...prev, open: val }))
        }
        title={`Delete ${deleteModalState.type === "column" ? "Column" : "Task"}`}
        description={`Are you sure you want to delete "${deleteModalState.title}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        isLoading={isDeletingColumn || isDeletingTask}
      />
    </div>
  );
};

export default AllColumnsForBoard;