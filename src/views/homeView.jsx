import { CodeEditorWithScreen, FileExplorer, Navbar, Sidebar } from "../components";

export function HomeView() {

  const fileStructure = [
  {
    type: "folder",
    name: "src",
    children: [
      { type: "file", name: "App.jsx" },
      {
        type: "folder",
        name: "components",
        children: [
          { type: "file", name: "Sidebar.jsx" },
          { type: "file", name: "Header.jsx" },
        ],
      },
    ],
  },
  { type: "file", name: "index.html" },
];


const content=<>
<FileExplorer structure={fileStructure} />
<CodeEditorWithScreen/>
</>

  return (
    <>
    <Navbar/>
    <Sidebar content={content} />
   
    </>

  );
}