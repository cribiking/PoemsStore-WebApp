import { Button } from "@/components/ui/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group"

export function FilterBar({ activeView, onViewChange, goToGallery, numSavedPoems, numDraftPoems }) {
  return (
      <nav className="filter-bar ">
        <ButtonGroup>
          <Button 
            onClick={() => onViewChange('saved')}
            style={activeView === 'saved' ? { backgroundColor: '#E91E63', color: 'white', borderColor: '#E91E63' } : {}}
            variant="outline"
          >
            Saved ({numSavedPoems})
          </Button>
          <ButtonGroupSeparator />
          <Button 
            onClick={() => onViewChange('drafts')}
            style={activeView === 'drafts' ? { backgroundColor: '#E91E63', color: 'white', borderColor: '#E91E63' } : {}}
            variant="outline"
          >
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