import { CodeEditorWithScreen, FileExplorer, Navbar, RighPanel, Sidebar } from "../components";

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
<div className="flex flex-col w-full h-screen">

<Navbar/>
<div className="flex flex-row w-full">
<FileExplorer structure={fileStructure} />

<CodeEditorWithScreen/>
<RighPanel/>

</div>
</div>
</>

  return (
    <>
    
    <Sidebar content={content} />
   
    </>

  );
}