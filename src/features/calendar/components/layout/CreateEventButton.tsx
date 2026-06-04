"use client";

type Props = {
  onClick: () => void;
};

export default function CreateEventButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 bg-blue-500 text-white rounded"
    >
      ＋
    </button>
  );
}
