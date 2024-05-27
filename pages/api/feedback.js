import fs from "fs";
import path from "path";

export function getFilePath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFileData(filePath) {
  const fileData = fs.readFileSync(filePath);
  return JSON.parse(fileData);
}

export default function handler(req, res) {
  const { query, method, body, url } = req;

  if (method === "POST") {
    const filePath = getFilePath();
    const data = extractFileData(filePath);
    const newData = {
      ...req.body,
      id: (data.length + 1).toString(),
    };
    data.push(newData);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Created", feedback: newData });
  } else {
    const filePath = getFilePath();
    const data = extractFileData(filePath);

    res.status(200).json({ feedback: data });
  }
}
