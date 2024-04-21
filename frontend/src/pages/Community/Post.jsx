import React from 'react';

const Post = ({ post, onFollow, onLike, onComment, onShare }) => {
  return (
    <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg p-3 my-4">
      <div className="relative">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          className="h-56 w-full object-cover rounded-t-lg"
        />
        <div className="absolute bottom-0 left-0 p-2">
          <button
            onClick={onLike}
            className="text-white bg-gray-900 rounded-full p-2 hover:bg-gray-700 transition duration-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
          <button
            onClick={onComment}
            className="text-white bg-gray-900 rounded-full p-2 ml-2 hover:bg-gray-700 transition duration-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 5c0-1.11-.89-2-2-2H6a2 2 0 00-2 2v14l4-4h10c1.11 0 2-.89 2-2V5z" />
            </svg>
          </button>
          <button
            onClick={onShare}
            className="text-white bg-gray-900 rounded-full p-2 ml-2 hover:bg-gray-700 transition duration-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12a8 8 0 018-8V0l8 8-8 8v-4a4 4 0 00-4-4H4z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="bg-white p-4 sm:p-6">
        <time dateTime="2022-10-10" className="block text-xs text-gray-500">
          10th Oct 2022
        </time>
        <a href="#">
          <h3 className="mt-0.5 text-lg text-gray-900">How to position your furniture for positivity</h3>
        </a>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus pariatur animi
          temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem, mollitia itaque minus
          soluta, voluptates neque explicabo tempora nisi culpa eius atque dignissimos. Molestias explicabo corporis
          voluptatem?
        </p>
      </div>
    </article>
  );
};

export default Post;
