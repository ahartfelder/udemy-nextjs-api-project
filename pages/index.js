import { redirect } from "next/navigation";
import { useRef, useState } from "react";

function HomePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  async function sendFeedbackHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const feedback = feedbackInputRef.current.value;

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ email, feedback }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(await response.json());
    emailInputRef.current.value = "";
    feedbackInputRef.current.value = "";
  }

  async function showFeedbacksHandler(event) {
    event.preventDefault();

    const response = await fetch("/api/feedback");
    const data = await response.json();
    setFeedbacks(data.feedback);
  }
  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={sendFeedbackHandler}>
        <div>
          <label htmlFor="email">Your email:</label>
          <input type="text" ref={emailInputRef} id="email" required />
        </div>
        <div>
          <label htmlFor="feedback">Feedback:</label>
          <textarea ref={feedbackInputRef} id="feedback" rows="5" required />
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={showFeedbacksHandler}>View Feedbacks</button>
      <ul>
        {feedbacks.map((item) => (
          <li key={item.id}>
            <h2>
              {item.feedback}{" "}
              <span
                style={{
                  color: "red",
                  fontStyle: "italic",
                }}
              >
                by {item.email}
              </span>
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
