import { FloppyDisk } from "@gravity-ui/icons";
import {
  Card,
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import Menu from "./Menu";

const ResumeForm = () => {
  return (
    <>
      <div className="flex items-center justify-center m-10">
        <Card className="w-full max-w-md">
          <Form>
            <Fieldset>
              <Fieldset.Legend className="text-2xl">
                Create your resume
              </Fieldset.Legend>
              <Description>Fill in your details.</Description>
              <FieldGroup>
                <TextField isRequired name="name">
                  <Label>Name</Label>
                  <Input placeholder="John Doe" />
                  <FieldError />
                </TextField>
                <TextField isRequired name="email" type="email">
                  <Label>Email</Label>
                  <Input placeholder="john@example.com" />
                  <FieldError />
                </TextField>
                <TextField
                  isRequired
                  name="bio"
                  validate={(value) => {
                    if (value.length < 10) {
                      return "Bio must be at least 10 characters";
                    }
                    return null;
                  }}
                >
                  <Label>Bio</Label>
                  <TextArea placeholder="Tell us about yourself..." />
                  <Description>Minimum 10 characters</Description>
                  <FieldError />
                </TextField>
              </FieldGroup>
              <Fieldset.Actions>
                <Button type="submit">
                  <FloppyDisk />
                  Save changes
                </Button>
                <Button type="reset" variant="secondary">
                  Cancel
                </Button>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ResumeForm;
