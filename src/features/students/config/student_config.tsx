import {
  StudentActionsCell,
  StudentGenderCell,
  StudentNameCell,
} from "../components";

export const GENDER_CONFIG = {
  FEMALE: { label: "Fille", color: "red" as const },
  MALE: { label: "Garçon", color: "blue" as const },
};

export const CYCLE_CONFIG = {
  ELEMENTARY_SCHOOL: { label: "Primaire" },
  MIDDLE_SCHOOL: { label: "Collège" },
  HIGH_SCHOOL: { label: "Lycée" },
};

export const TABLE_COLUMNS = [
  { key: "cne", label: "CNE" },
  { key: "name", label: "Nom" },
  { key: "phone", label: "Téléphone" },
  { key: "email", label: "Email" },
  { key: "gender", label: "Genre" },
  { key: "signupDate", label: "Date d'inscription" },
  { key: "level", label: "Niveau" },
  { key: "actions", label: "Actions" },
];

export const PAGE_SIZE = 10;

export const renderStudentCell = (student: any, columnKey: string) => {
  switch (columnKey) {
    case "name":
      return <StudentNameCell name={student.name} />;

    case "gender":
      return (
        <StudentGenderCell
          genderLabel={student.gender}
          genderColor={student.genderColor}
        />
      );

    case "actions":
      return (
        <StudentActionsCell
          studentId={student.id}
          onView={(studentId) => console.log("Voir", studentId)}
        />
      );

    default:
      return (
        <span className="text-sm text-neutral-700">{student[columnKey]}</span>
      );
  }
};
