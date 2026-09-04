import React from "react";
import UpdateIntroVideo from "./UpdateIntroVideo";
import UpdateProfileImage from "./UpdateProfileImage";
import UpdateLawyerDetails from "./UpdateLawyerDetails";

const LawyerProfile = () => {
  return (
    <div className="grid grid-cols-4 gap-6 p-3 lg:p-12">
      <div className="col-span-4 xl:col-span-1">
        <UpdateProfileImage></UpdateProfileImage>
        <UpdateIntroVideo></UpdateIntroVideo>
      </div>
      <div className="col-span-4 xl:col-span-3">
        <UpdateLawyerDetails></UpdateLawyerDetails>
      </div>
    </div>
  );
};

export default LawyerProfile;
