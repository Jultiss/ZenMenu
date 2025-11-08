import { RecettesData, RepasPlanifie } from '../types';
import { ListeCourses } from '../components/ListeCourses';

interface CoursesPageProps {
  plan: RepasPlanifie[];
  recettesData: RecettesData;
}

export function CoursesPage({ plan, recettesData }: CoursesPageProps) {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>🛒 Ma Liste de Courses</h1>
        <p className="page-subtitle">
          Organisée par rayon pour faciliter vos achats
        </p>
      </div>
      
      <ListeCourses plan={plan} recettesData={recettesData} />
    </div>
  );
}
