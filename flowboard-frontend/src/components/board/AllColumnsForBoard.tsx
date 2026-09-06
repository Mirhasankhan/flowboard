"use client"

const AllColumnsForBoard = (board: any) => {
    const [addColumn, { isLoading }] = useAddNewColumnMutation();
    const [addTask, { isLoading: isAddingTask }] = useAddNewTaskMutation();
    const [updateColumn, { isLoading: isUpdatingColumn }] = useUpdateColumnMutation();
    const [moveColumn, { isLoading: isMovingColumn }] = useMoveColumnMutation();
    const [moveTask, { isLoading: isMovingTask }] = useMoveTaskMutation();
        console.log("board", board?.board?.result?.board?.columns);
    return (
        <div>
            
        </div>
    );
};

export default AllColumnsForBoard;