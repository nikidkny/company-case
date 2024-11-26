import Button from "../components/atoms/Button";
import TextHeadline from "../components/atoms/TextHeadline";
// import { Dropdown } from "../components/molecules/Dropdown";

export default function AddInstrumentPage() {
  return (
    <div className="edit-page-wrapper flex flex-col gap-6 p-6 ">
      <div className="back-button-wrapper flex flex-col items-start">
        <Button
          onClick={() => {
            // go back to profile/profileId page
            window.history.back();
          }}
          buttonVariant="secondary"
          iconPosition="none"
          className="w-fit"
        >
          Back
        </Button>
      </div>
      <TextHeadline variant="h2" size="sm">
        Add Instrument
      </TextHeadline>
      <div className="edit-name-wrapper">
        <TextHeadline variant="h3" size="sm">
          Name
        </TextHeadline>
        {/* <Dropdown
          dropdownOptions={["guitar", "bass", "drums", "vocals", "keyboard"]}
          dropdownValue=""
          dropdownLabel="Instrument"
          dropdownOnChange={(value) => console.log(value)}
        /> */}
        <div>
          <TextHeadline variant="h3" size="sm">
            How experienced are you?
          </TextHeadline>
          <div>
            <div>
              <TextHeadline variant="h3" size="sm">
                Level
              </TextHeadline>
              {/* plus and minus buttons missing to change the level */}
            </div>
          </div>
        </div>
        <div>
          <TextHeadline variant="h3" size="sm">
            Genre
          </TextHeadline>
          {/* <Dropdown
                dropdownOptions={["rock", "pop", "jazz", "metal", "punk"]}
                dropdownValue=""
                dropdownLabel="Genre"
                dropdownOnChange={(value) => console.log(value)}
            /> */}
        </div>
        <div className="w-full h-full">
          <Button
            buttonVariant="primary"
            onClick={() => console.log("Save changes")}
            iconPosition="none"
            size="lg"
          >
            Add Instrument
          </Button>
        </div>
      </div>
    </div>
  );
}
