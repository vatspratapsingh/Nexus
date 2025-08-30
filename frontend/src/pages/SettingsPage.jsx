import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Settings, User, Mail, GraduationCap, Building, ShuffleIcon, CameraIcon } from "lucide-react";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const { authUser } = useAuthUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: authUser?.fullName || "",
    email: authUser?.email || "",
    college: authUser?.college || "",
    fieldOfStudy: authUser?.fieldOfStudy || "",
    profilePics: authUser?.profilePics || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // 1-100 included
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormData(prev => ({ ...prev, profilePics: randomAvatar }));
    toast.success("Random profile picture generated!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, profilePics: event.target.result }));
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: Implement update profile API call

    toast.success("Profile updated successfully!");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: authUser?.fullName || "",
      email: authUser?.email || "",
      college: authUser?.college || "",
      fieldOfStudy: authUser?.fieldOfStudy || "",
      profilePics: authUser?.profilePics || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-2xl space-y-8">
        <div className="flex items-center gap-3 mb-6">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        </div>

        {/* Profile Section */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </h2>
            
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                  {formData.profilePics ? (
                    <img
                      src={formData.profilePics}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <CameraIcon className="size-12 text-base-content opacity-40" />
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex items-center gap-2">
                    <button 
                      type="button" 
                      onClick={handleRandomAvatar} 
                      className="btn btn-accent btn-sm"
                    >
                      <ShuffleIcon className="size-4 mr-2" />
                      Generate Random Avatar
                    </button>
                    
                    <label className="btn btn-outline btn-sm cursor-pointer">
                      <CameraIcon className="size-4 mr-2" />
                      Upload Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      College
                    </span>
                  </label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Field of Study
                    </span>
                  </label>
                  <input
                    type="text"
                    name="fieldOfStudy"
                    value={formData.fieldOfStudy}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="input input-bordered"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-primary"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      className="btn btn-primary"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn btn-outline"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Account Settings</h2>
            <div className="space-y-4">
              <button className="btn btn-outline btn-error w-full">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
