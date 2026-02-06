import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export function FilterBar({ goToDrafts, numSavedPoems, numDraftPoems, showAllPoems }) {
  return (
    <nav className="filter-bar">
      <ButtonGroup>
        <Button onClick={showAllPoems} variant="outline">
          Todos ({numSavedPoems + numDraftPoems})
        </Button>
        <ButtonGroupSeparator />
        <Button variant="outline">
          Guardados ({numSavedPoems})
        </Button>
        <ButtonGroupSeparator />
        <Button onClick={goToDrafts} variant="outline">
          Borradores ({numDraftPoems})
        </Button>
      </ButtonGroup>
    </nav>
  );
}

/*onClick , s'hauria de passar una funcio que obris el formulari */