"use client";

import { useState } from "react";
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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<keyof typeof columns>("todo");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    progress: 0,
  });

  // ✅ Handle drag
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

  // ✅ Handle form submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      progress: formData.progress,
    };

    setColumns({
      ...columns,
      [activeColumn]: [newTask, ...columns[activeColumn]],
    });

    setFormData({ title: "", description: "", progress: 0 });
    setIsModalOpen(false);
  }

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4 p-4">
          {Object.entries(columns).map(([colId, tasks]) => (
            <div key={colId} className="rounded-xl p-3 border-2 border-[#1C1D2214] border-dashed">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg capitalize">
                  {colId.replace(/([A-Z])/g, " $1")}
                </h2>
                <button
                  onClick={() => {
                    setActiveColumn(colId as keyof typeof columns);
                    setIsModalOpen(true);
                  }}
                  className="bg-blue-500 text-white px-2 py-1 text-sm rounded"
                >
                  + Add
                </button>
              </div>

              <SortableContext
                items={tasks.map((t) => t.id)}
                strategy={verticalListSortingStrategy}
              >
                {tasks.map((task) => (
                  <SortableTask key={task.id} task={task} />
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

function SortableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-lg shadow p-3 mb-2 cursor-grab"
    >
      <h3 className="font-medium">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>
      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full"
          style={{ width: `${task.progress}%` }}
        ></div>
      </div>
    </div>
  );
}

