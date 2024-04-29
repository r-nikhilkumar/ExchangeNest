import React from "react";
import {
  latestNewsData,
  shortcutLinksData,
  storyGalleryData,
  postData,
  eventData,
  advertisementData,
  onlineListData,
} from "../../common/data/dummyCommunityData";
import AddPost from "../../pages/AddPost/AddPost";

export const LeftSidebar = () => {
  return (
    <div className="left-sidebar dark-theme">
      {/* Latest News */}
      <div className="imp-links">
        {latestNewsData.map((item) => (
          <a key={item.id} href="#">
            <img src={item.image} alt="Latest News" />
            {item.title}
          </a>
        ))}
        <a href="#">See More</a>
      </div>
      {/* Shortcut Links */}
      <div className="shortcut-link dark-theme">
        <p>Your Shortcuts</p>
        {shortcutLinksData.map((item) => (
          <a key={item.id} href="#">
            <img src={item.icon} alt={item.title} />
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export const MainContent = () => {
  return (
    <div className="main-content">
      {/* Story Gallery */}
      <div className="story-gallery">
        {storyGalleryData.map((item) => (
          <div
            key={item.id}
            className="story"
            style={{ backgroundImage: `url(${item.bgImage})` }}
          >
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      {/* Write Post Container */}
      <AddPost />
      {/* Post Container */}
      <div className="post-container">
        {postData.map((item) => (
          <div key={item.id} className="post-row">
            <div className="user-profile">
              <img src={item.profileImage} alt="Profile" />
              <div>
                <p>{item.user}</p>
                <span>{item.date}</span>
              </div>
            </div>
            <a href="#">
              <i className="fas fa-ellipsis-v"></i>
            </a>
            <p className="post-text">{item.text}</p>
            <img src={item.image} alt="Post Image" className="post-img" />
            <div class="activity-icons">
              <div>
                <img src="https://i.postimg.cc/pLKNXrMq/like-blue.png" />
                {item.likes}
              </div>
              <div>
                <img src="https://i.postimg.cc/rmjMymWv/comments.png" />
                {item.comments}
              </div>
              <div>
                <img src="https://i.postimg.cc/T2bBchpG/share.png" />
                {item.shares}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="load-more-btn">
        Load More
      </button>
    </div>
  );
};

export const RightSidebar = () => {
  return (
    <div className="right-sidebar">
      {/* Events */}
      <div className="sidebar-title">
        <h4>Events</h4>
        <a href="#">See All</a>
      </div>
      {eventData.map((item) => (
        <div key={item.id} className="event">
          <div className="left-event">
            <h3>{item.date}</h3>
            <span>{item.title}</span>
          </div>
          <div className="right-event">
            <h4>{item.title}</h4>
            <p>
              <i className="fas fa-map-marker-alt"></i> {item.location}
            </p>
            <a href="#">More Info</a>
          </div>
        </div>
      ))}
      {/* Advertisement */}
      <div className="sidebar-title">
        <h4>Advertisement</h4>
        <a href="#">Close</a>
      </div>
      <img
        src={advertisementData}
        alt="Advertisement"
        className="siderbar-ads"
      />
      {/* Conversation */}
      <div className="sidebar-title">
        <h4>Conversation</h4>
        <a href="#">Hide Chat</a>
      </div>
      {/* Add online list components here */}
      {onlineListData.map((item) => (
        <div key={item.id} className="online-list">
          <div className="online">
            <img src={item.image} alt="Online User" />
          </div>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export const Footer = () => {
  return (
    <div className="footer">
      <p>Copyright 2022 - Vkive Tutorials</p>
    </div>
  );
};
