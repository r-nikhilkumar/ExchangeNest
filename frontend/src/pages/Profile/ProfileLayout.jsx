import React, { useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { request } from "../../common/api/config";
import { updateProfileAPI } from "../../common/api/apiCall";

function ProfileLayout({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [contact, setContact] = useState(user.contact);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(user.image);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
      setImage(file);
    }
  };

  const handleSaveProfile = async () => {
    // Mock validation - check if required fields are not empty
    if (!name || !email || !contact) {
      setError("Please fill out all fields.");
      return;
    }

    if (image != null) {
      const formData = new FormData();
      formData.append("profilePic", image);

      try {
        const response = await fetch("https://exchangenestapi.onrender.com/auth/upload", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "auth-token": window.localStorage.getItem("authToken"),
          },
          body: formData,
        });
        const imageData = await response.json()
        setImagePreview(imageData.filePath);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }

    // Handle response data as needed
    const updateData = {
      name,
      email,
      contact,
    };
    const resP = await request(updateProfileAPI, updateData)
    console.log("Updating profile...");
    setTimeout(() => {
      console.log("Profile updated successfully!");
      setIsEditing(false);
      setError(null);
    }, 100);
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-32 h-32 rounded-full"
            />
            {isEditing && (
              <label
                htmlFor="profile-pic"
                className="absolute bottom-0 right-0 cursor-pointer bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition duration-300 ease-in-out"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </label>
            )}
            <input
              type="file"
              accept="image/*"
              id="profile-pic"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-300 mr-2">
            Name:
          </label>
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-800 flex-grow"
            />
          ) : (
            <div className="p-2 bg-gray-700 rounded-md inline-block flex-grow">
              {name}
            </div>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-300 mr-2">
            Email:
          </label>
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-800 flex-grow"
            />
          ) : (
            <div className="p-2 bg-gray-700 rounded-md inline-block flex-grow">
              {email}
            </div>
          )}
        </div>
        <div className="mb-4 flex items-center">
          <label className="block text-sm font-medium text-gray-300 mr-2">
            Contact:
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="p-2 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-800 flex-grow"
            />
          ) : (
            <div className="p-2 bg-gray-700 rounded-md inline-block flex-grow">
              {contact}
            </div>
          )}
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-center">
          {isEditing ? (
            <button
              onClick={handleSaveProfile}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 focus:outline-none"
            >
              Save Profile
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gray-700 text-gray-300 py-2 px-6 rounded hover:bg-gray-800 focus:outline-none"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;
