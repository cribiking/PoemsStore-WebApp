import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export function FilterBar({ goToDrafts, numSavedPoems, numDraftPoems, showAllPoems , goToGallery}) {
  return (
    <nav className="filter-bar">
      <ButtonGroup>
        <Button onClick={showAllPoems} variant="outline">
          All ({numSavedPoems + numDraftPoems})
        </Button>
        <ButtonGroupSeparator />
        <Button variant="outline">
          Saved ({numSavedPoems})
        </Button>
        <ButtonGroupSeparator />
        <Button onClick={goToDrafts} variant="outline">
          Drafts ({numDraftPoems})
        </Button>
        <ButtonGroupSeparator />
        <Button onClick={goToGallery} variant="outline">
          Gallery
        </Button>
      </ButtonGroup>
    </nav>
  );
}

/*onClick , s'hauria de passar una funcio que obris el formulari */