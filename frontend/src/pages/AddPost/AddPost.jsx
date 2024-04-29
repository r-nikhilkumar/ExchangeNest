import React, { useState } from "react";

function AddPost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);
  };

  const handlePost = () => {
    // Handle post logic here, including text, image, and video
    console.log("Text:", text);
    console.log("Image:", image);
    console.log("Video:", video);
  };

  return (
    <div className="write-post-container">
      <div className="user-profile">
        <img
          src="https://i.postimg.cc/cHg22LhR/profile-pic.png"
          alt="Profile"
        />
        <div>
          <p>John Nicholson</p>
          <small>
            Public <i className="fas fa-caret-down"></i>
          </small>
        </div>
      </div>
      {/* Add post input container component here */}
      <div className="post-input-container">
        <textarea
          rows="3"
          placeholder="What's on your mind, John?"
          value={text}
          onChange={handleTextChange}
        />
        <div className="add-post-links">
          <div className="flex justify-between">
            <label htmlFor="image-input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M18 18H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2zM8 11.5v2l2-1-2-1zm10-2.5h-2V14h2v-5zm-4 4h2v-2h-2v2z" />
              </svg>
              Image
            </label>
            <input
              id="image-input"
              type="file"
              hidden
              onChange={handleImageChange}
            />
            <label htmlFor="video-input">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                viewBox="0 0 24 24"
              >
                <path d="M19 5v14H5V5h14m0-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM15.5 12l-8 4V8l8 4z" />
              </svg>
              Video
            </label>
            <input
              id="video-input"
              type="file"
              hidden
              onChange={handleVideoChange}
            />
            <button className="post-button" onClick={handlePost}>
              Post
            </button>
          </div>
          <a href="#">
            <img
              src="https://i.postimg.cc/QMD2BDXs/live-video.png"
              alt="live-video"
            />
            <span className="text-white">Live Video</span>
          </a>
        </div>

        {/* Add other post links */}
      </div>
    </div>
  );
}

export default AddPost;
