import icone from "@/assets/icones/students_icone_table.svg";
interface StudentNameCellProps {
  name: string;
}

export const StudentNameCell = ({ name }: StudentNameCellProps) => {
  return (
    <div className="flex items-center gap-2">
      <img src={icone} alt="" className="w-8 h-8 rounded-full" />

      <span className="text-sm font-medium text-neutral-800">{name}</span>
    </div>
  );
};
