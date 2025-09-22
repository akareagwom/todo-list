"use client";

import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiMoreHorizontal } from "react-icons/fi";
import { TfiMenuAlt } from "react-icons/tfi";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineMessage } from "react-icons/md";
import RotatingCube from "../uicomponents/RotatingCube"
import {
  DndContext,
  closestCenter,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Task = {
  id: string;
  title: string;
  description: string;
  progress: number;
};

interface TaskData {
  id: string;
  status: "todo" | "inprogress" | "done";
}

const initialTasks = {
  todo: [
    { id: "1", title: "Design UI", description: "Work on landing page", progress: 40 },
  ],
  inProgress: [
    { id: "2", title: "Create Wireframe", description: "App wireframes", progress: 60 },
  ],
  done: [
    { id: "3", title: "Product Launch", description: "Release v1.0", progress: 100 },
  ],
};

export default function KanbanBoard() {
  const [columns, setColumns] = useState(initialTasks);

  //cube state
  const [cubeActive, setCubeActive] = useState(false);
   const [isAddingTask, setIsAddingTask] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<keyof typeof columns>("todo");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    progress: 0,
  });

  //  Handle drag
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    let sourceCol: keyof typeof columns | null = null;
    let targetCol: keyof typeof columns | null = null;

    for (const col in columns) {
      if (columns[col as keyof typeof columns].some((task) => task.id === active.id)) {
        sourceCol = col as keyof typeof columns;
      }
      if (columns[col as keyof typeof columns].some((task) => task.id === over.id)) {
        targetCol = col as keyof typeof columns;
      }
    }

    if (!sourceCol) return;

    if (sourceCol === targetCol && targetCol) {
      const oldTasks = columns[sourceCol];
      const oldIndex = oldTasks.findIndex((task) => task.id === active.id);
      const newIndex = oldTasks.findIndex((task) => task.id === over.id);
      const newTasks = arrayMove(oldTasks, oldIndex, newIndex);

      setColumns({ ...columns, [sourceCol]: newTasks });
    }

    if (sourceCol && targetCol && sourceCol !== targetCol) {
      const sourceTasks = [...columns[sourceCol]];
      const taskToMove = sourceTasks.find((task) => task.id === active.id);
      if (!taskToMove) return;

      const targetTasks = [...columns[targetCol]];
      const updatedSource = sourceTasks.filter((t) => t.id !== active.id);
      const updatedTarget = [taskToMove, ...targetTasks];

      setColumns({
        ...columns,
        [sourceCol]: updatedSource,
        [targetCol]: updatedTarget,
      });
    }
  }

const [cubeCallback, setCubeCallback] = useState<() => void>();

  //  Handle form submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      progress: formData.progress,
    };

    setCubeActive(true);
    const onAnimationComplete = () => {
      setColumns({
        ...columns,
        [activeColumn]: [newTask, ...columns[activeColumn]],
      });
      setIsAddingTask(false);
      setCubeActive(false);
      setFormData({ title: "", description: "", progress: 0 });
      setIsModalOpen(false);
    };

    // Pass this callback to RotatingCube
    setCubeCallback(() => onAnimationComplete);

    // setColumns({
    //   ...columns,
    //   [activeColumn]: [newTask, ...columns[activeColumn]],
    // });

    setFormData({ title: "", description: "", progress: 0 });
    setIsModalOpen(false);
  }

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {cubeActive && cubeCallback && <RotatingCube onAnimationComplete={cubeCallback} />}
        <div className="grid grid-cols-3 gap-4 p-4">
          {Object.entries(columns).map(([colId, tasks]) => (
            <div key={colId} className="rounded-xl p-3 border-2 border-[#1C1D2214] border-dashed">
              <div className="flex justify-between items-center mb-2">
                <h2 className=" text-[#1C1D2280] text-[16px] capitalize">
                  {colId.replace(/([A-Z])/g, " $1")}
                </h2>
                <button
                  onClick={() => {
                    setActiveColumn(colId as keyof typeof columns);
                    setIsModalOpen(true);
                  }}
                  className=" flex gap-2 items-center px-2 py-1 text-sm "
                >
                  <div className="rounded-[50%] p-1 bg-[#1C1D2214]">
                    <BiPlus className='text-[#1C1D22]' />
                  </div>
                  <p className="font-600 font-semibold text-[14px] " >Add new task</p>
                </button>
              </div>

              <SortableContext
                items={tasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map((task) => (
                  <SortableTask key={task.id} task={task}  />
                ))}
              </SortableContext>
            </div>
          ))}
        </div>
      </DndContext>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Task</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border rounded px-2 py-1"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-2 py-1"
              />
              <div>
                <label className="block text-sm">Progress: {formData.progress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) =>
                    setFormData({ ...formData, progress: parseInt(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1 rounded border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 rounded bg-blue-500 text-white"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function SortableTask({ task, taskdata }: { task: Task; taskdata?: TaskData }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  
  const taskStatus = taskdata?.status ?? "todo";

  // Progress bar colors
  const progressColor =
    taskStatus === "done"
      ? "#FFA048"
      : taskStatus === "inprogress"
      ? "#FFA048"
      : "#78D700";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow p-3 mb-2 cursor-grab"
    >
      
      <div className="flex justify-between items-center">
        <h3 className="font-medium">{task.title}</h3>
        <div className="rounded-[50%] border-2 border-[#1C1D2214] p-1">
          <FiMoreHorizontal />
        </div>
      </div>
      <p className="text-sm text-gray-500">{task.description}</p>
      <div className="flex justify-between py-2 items-center">
        <div className=" text-[#1C1D2280] text-[14px] flex gap-2 items-center">
          <TfiMenuAlt />
          <p>Progress</p>
        </div>
        <p className="font-600 text-[14px]">{task.progress} /100</p>
      </div>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
        <div
          className="h-1 rounded"
          style={{ width: `${task.progress}%`, backgroundColor: progressColor }}
        ></div>
      </div>
      <div className="py-4 flex justify-between items-center text-[14px]">
        <p className="bg-[#888DA71A] text-[#888DA7] text-center p-1 w-[113px] rounded-[17px]">
          22 Aug 2022
        </p>
        <div className="flex items-center gap-2 text-[#888DA7]">
          <div className="flex items-center gap-1">
            <MdOutlineMessage />
            <p>7</p>
          </div>
          <div className="flex items-center gap-1">
            <GrAttachment />
            <p>2</p>
          </div>
        </div>
      </div>
    </div>
  );
}


