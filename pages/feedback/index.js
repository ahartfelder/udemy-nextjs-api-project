import Link from "next/link";
import { extractFileData, getFilePath } from "../api/feedback";

export default function FeedbacksPage(props) {
  return (
    <ul>
      {props.feedback.map(({ id, email, feedback }) => (
        <li key={id}>
          <Link href={`/feedback/${id}`}>{feedback}</Link>
          <span> by {email}</span>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = getFilePath();
  const data = extractFileData(filePath);

  return {
    props: {
      feedback: data,
    },
  };
}
