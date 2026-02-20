interface StudentNameCellProps {
  name: string;
}

export const StudentNameCell = ({ name }: StudentNameCellProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
        <span className="text-primary-600 text-sm font-medium">{name[0]}</span>
      </div>
      <span className="text-sm font-medium text-neutral-800">{name}</span>
    </div>
  );
};
