import {
  FloppyDisk,
  Envelope,
  Globe,
  LogoGithub,
  LogoLinkedin,
  Plus,
  TrashBin,
} from "@gravity-ui/icons";
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
  InputGroup,
  Calendar,
  DateField,
  DatePicker,
} from "@heroui/react";
import ResumeLayout from "./ResumeLayout";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "./Menu";
import { useState } from "react";
import { useSelector } from "react-redux";

const fadeSlide = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ResumeForm = () => {
  const user = useSelector((store) => store.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [address, setAddress] = useState("");
  const [education, setEducation] = useState([
    {
      institute: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
      place: "",
    },
  ]);

  const [projects, setProjects] = useState([
    {
      title: "",
      description: "",
      techStack: "",
      githubLink: "",
      demoLink: "",
    },
  ]);
  const [showProjects, setShowProjects] = useState(false);
  const [experience, setExperience] = useState([
    {
      company: "",
      role: "",
      description: "",
      techStack: "",
      startDate: "",
      endDate: "",
      location: "",
    },
  ]);
  const [showExperience, setShowExperience] = useState(false);
  const [skills, setSkills] = useState("");
  const [certifications, setCertifications] = useState("");
  const [languages, setLanguages] = useState("");

  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      {
        institute: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: "",
        place: "",
      },
    ]);
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const deleteEducation = (indexToDelete) => {
    setEducation((prev) => prev.filter((_, index) => index !== indexToDelete));
  };
  const deleteProject = (indexToDelete) => {
    setProjects((prev) => prev.filter((_, index) => index !== indexToDelete));
    if (projects.length === 1) {
      setShowProjects(false);
    }
  };
  const deleteExperience = (indexToDelete) => {
    setExperience((prev) => prev.filter((_, index) => index !== indexToDelete));
    if (experience.length === 1) {
      setShowExperience(false);
    }
  };
  const handleAddProjects = () => {
    if (!showProjects) {
      setShowProjects(true);
      setProjects([
        {
          title: "",
          description: "",
          techStack: "",
          githubLink: "",
          demoLink: "",
        },
      ]);
    } else {
      setProjects((prev) => [
        ...prev,
        {
          title: "",
          description: "",
          techStack: "",
          githubLink: "",
          demoLink: "",
        },
      ]);
    }

    setShowExperience(false);
  };
  const handleAddExperience = () => {
    if (!showExperience) {
      setShowExperience(true);
      setExperience([
        {
          company: "",
          role: "",
          description: "",
          techStack: "",
          startDate: "",
          endDate: "",
          location: "",
        },
      ]);
    } else {
      setExperience((prev) => [
        ...prev,
        {
          company: "",
          role: "",
          description: "",
          techStack: "",
          startDate: "",
          endDate: "",
          location: "",
        },
      ]);
    }
    setShowProjects(false);
  };

  const transformToResume = () => {
    return {
      title,
      description,

      userId: {
        firstName: `${user.firstName}`,
        lastName: `${user.lastName}`,
        emailId: `${user.emailId}`,
      },

      personalInfo: {
        phone,
        address,
        github,
        linkedin,
        portfolio,
      },

      education: education,

      projects: projects.map((p) => ({
        ...p,
        description: p.description ? p.description.split("\n") : [],
        techStack: p.techStack ? p.techStack.split(",") : [],
      })),

      experience: experience.map((exp) => ({
        ...exp,
        description: exp.description ? exp.description.split("\n") : [],
        techStack: exp.techStack ? exp.techStack.split(",") : [],
      })),

      skills: skills ? skills.split(",") : [],

      languages: languages
        ? languages.split(",").map((l) => ({ name: l.trim() }))
        : [],

      certifications: certifications ? certifications.split(",") : [],
    };
  };

  const hasStartedTyping =
    title ||
    description ||
    phone ||
    github ||
    linkedin ||
    portfolio ||
    address ||
    skills ||
    certifications ||
    languages;

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeSlide}
        transition={{ duration: 0.4 }}
        className={`min-h-[calc(100vh-70px)] bg-linear-to-br from-gray-100 to-gray-200 transition-all duration-500 ${
          hasStartedTyping
            ? "flex gap-10 px-6 py-6"
            : "flex justify-center items-start pt-8"
        }`}
      >
        {/* ================= FORM ================= */}
        <div
          className={`transition-all duration-500 ${
            hasStartedTyping
              ? "w-130 h-[85vh] overflow-y-auto bg-white p-6 rounded-xl shadow-md"
              : "w-full max-w-2xl bg-white p-10 rounded-2xl shadow-xl h-[85vh] overflow-y-auto"
          }`}
        >
          {!hasStartedTyping && (
            <p className="text-gray-400 text-center mb-6 text-sm tracking-wide">
              Start typing to see live preview →
            </p>
          )}

          <Card className="w-full shadow-none border-none space-y-4">
            <Form>
              <Fieldset>
                <Fieldset.Legend className="text-2xl font-semibold">
                  Create your resume
                </Fieldset.Legend>
                <Description>Fill in your details.</Description>
                <FieldGroup>
                  <TextField name="name">
                    <Label>Title</Label>
                    <Input
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Sofware Developer"
                    />
                    <FieldError />
                  </TextField>
                  <TextField isRequired name="description" type="text">
                    <Label>Description</Label>
                    <TextArea
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="About yourself.."
                    ></TextArea>
                    <FieldError />
                  </TextField>
                  <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                    <Label className="text-md font-semibold">
                      Personal Info
                    </Label>
                  </div>
                  <TextField isRequired name="phone" type="number">
                    <Label>Phone</Label>
                    <Input
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="123456789"
                    ></Input>
                    <FieldError />
                  </TextField>
                  <TextField isRequired className="w-full" name="website">
                    <Label>Github</Label>
                    <InputGroup onChange={(e) => setGithub(e.target.value)}>
                      <InputGroup.Prefix>
                        <LogoGithub className="size-4 text-muted" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        aria-label="Github URL"
                        className="w-full"
                      />
                    </InputGroup>
                  </TextField>
                  <TextField isRequired className="w-full" name="website">
                    <Label>Linkedin</Label>
                    <InputGroup onChange={(e) => setLinkedin(e.target.value)}>
                      <InputGroup.Prefix>
                        <LogoLinkedin className="size-4 text-muted" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        aria-label="Linkedin URL"
                        className="w-full"
                      />
                    </InputGroup>
                  </TextField>
                  <TextField isRequired className="w-full" name="website">
                    <Label>Portfolio</Label>
                    <InputGroup onChange={(e) => setPortfolio(e.target.value)}>
                      <InputGroup.Prefix>
                        <Globe className="size-4 text-muted" />
                      </InputGroup.Prefix>
                      <InputGroup.Input
                        aria-label="Portfolio URL"
                        className="w-full"
                      />
                    </InputGroup>
                  </TextField>
                  <TextField isRequired name="address" type="text">
                    <Label>Address</Label>
                    <TextArea
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Bangalore, India"
                    ></TextArea>
                    <FieldError />
                  </TextField>
                  <div>
                    {education.map((edu, index) => (
                      <motion.div
                        key={index}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={fadeSlide}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-4 border-t border-gray-200"
                      >
                        {index === 0 && (
                          <Label className="text-md font-semibold">
                            Education
                          </Label>
                        )}

                        <TextField className="mt-3" isRequired>
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "degree",
                                e.target.value,
                              )
                            }
                          />
                        </TextField>
                        <TextField className="mt-3" isRequired>
                          <Label>Institute</Label>
                          <Input
                            value={edu.institute}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "institute",
                                e.target.value,
                              )
                            }
                          />
                        </TextField>

                        <TextField className="mt-3" isRequired>
                          <Label>Field of Study</Label>
                          <Input
                            value={edu.fieldOfStudy}
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "fieldOfStudy",
                                e.target.value,
                              )
                            }
                          />
                        </TextField>

                        <div className="flex justify-between">
                          <DatePicker
                            isRequired
                            className="w-50 mt-3"
                            name="date"
                            onChange={(date) =>
                              handleEducationChange(index, "startDate", date)
                            }
                          >
                            <Label>Start Date</Label>
                            <DateField.Group fullWidth>
                              <DateField.Input>
                                {(segment) => (
                                  <DateField.Segment segment={segment} />
                                )}
                              </DateField.Input>
                              <DateField.Suffix>
                                <DatePicker.Trigger>
                                  <DatePicker.TriggerIndicator />
                                </DatePicker.Trigger>
                              </DateField.Suffix>
                            </DateField.Group>
                            <DatePicker.Popover>
                              <Calendar aria-label="Event date">
                                <Calendar.Header>
                                  <Calendar.YearPickerTrigger>
                                    <Calendar.YearPickerTriggerHeading />
                                    <Calendar.YearPickerTriggerIndicator />
                                  </Calendar.YearPickerTrigger>
                                  <Calendar.NavButton slot="previous" />
                                  <Calendar.NavButton slot="next" />
                                </Calendar.Header>
                                <Calendar.Grid>
                                  <Calendar.GridHeader>
                                    {(day) => (
                                      <Calendar.HeaderCell>
                                        {day}
                                      </Calendar.HeaderCell>
                                    )}
                                  </Calendar.GridHeader>
                                  <Calendar.GridBody>
                                    {(date) => <Calendar.Cell date={date} />}
                                  </Calendar.GridBody>
                                </Calendar.Grid>
                                <Calendar.YearPickerGrid>
                                  <Calendar.YearPickerGridBody>
                                    {({ year }) => (
                                      <Calendar.YearPickerCell year={year} />
                                    )}
                                  </Calendar.YearPickerGridBody>
                                </Calendar.YearPickerGrid>
                              </Calendar>
                            </DatePicker.Popover>
                          </DatePicker>
                          <DatePicker
                            isRequired
                            className="w-50 mt-3"
                            name="date"
                            onChange={(date) =>
                              handleEducationChange(index, "endDate", date)
                            }
                          >
                            <Label>End Date</Label>
                            <DateField.Group fullWidth>
                              <DateField.Input>
                                {(segment) => (
                                  <DateField.Segment segment={segment} />
                                )}
                              </DateField.Input>
                              <DateField.Suffix>
                                <DatePicker.Trigger>
                                  <DatePicker.TriggerIndicator />
                                </DatePicker.Trigger>
                              </DateField.Suffix>
                            </DateField.Group>
                            <DatePicker.Popover>
                              <Calendar aria-label="Event date">
                                <Calendar.Header>
                                  <Calendar.YearPickerTrigger>
                                    <Calendar.YearPickerTriggerHeading />
                                    <Calendar.YearPickerTriggerIndicator />
                                  </Calendar.YearPickerTrigger>
                                  <Calendar.NavButton slot="previous" />
                                  <Calendar.NavButton slot="next" />
                                </Calendar.Header>
                                <Calendar.Grid>
                                  <Calendar.GridHeader>
                                    {(day) => (
                                      <Calendar.HeaderCell>
                                        {day}
                                      </Calendar.HeaderCell>
                                    )}
                                  </Calendar.GridHeader>
                                  <Calendar.GridBody>
                                    {(date) => <Calendar.Cell date={date} />}
                                  </Calendar.GridBody>
                                </Calendar.Grid>
                                <Calendar.YearPickerGrid>
                                  <Calendar.YearPickerGridBody>
                                    {({ year }) => (
                                      <Calendar.YearPickerCell year={year} />
                                    )}
                                  </Calendar.YearPickerGridBody>
                                </Calendar.YearPickerGrid>
                              </Calendar>
                            </DatePicker.Popover>
                          </DatePicker>
                        </div>

                        <TextField className="mt-3" isRequired>
                          <Label>Grade</Label>
                          <Input
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "grade",
                                e.target.value,
                              )
                            }
                            type="number"
                          />
                        </TextField>

                        <TextField className="mt-3" isRequired>
                          <Label>Place</Label>
                          <Input
                            onChange={(e) =>
                              handleEducationChange(
                                index,
                                "place",
                                e.target.value,
                              )
                            }
                            type="text"
                          />
                        </TextField>
                        {index === education.length - 1 && (
                          <div className="flex items-center justify-end mt-4 gap-3">
                            <Button
                              onClick={handleAddEducation}
                              size="sm"
                              variant="secondary"
                            >
                              <Plus className="w-3 h-3" />
                              Add
                            </Button>
                            {education.length > 1 && (
                              <Button
                                onClick={() => deleteEducation(index)}
                                isIconOnly
                                variant="danger-soft"
                              >
                                <TrashBin />
                              </Button>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                    <div className="w-full space-y-4 flex flex-col items-start">
                      {/* ================= PROJECT BUTTON ================= */}
                      {!showProjects && (
                        <Button
                          onClick={handleAddProjects}
                          size="sm"
                          variant="secondary"
                          className="flex items-center gap-2 w-fit px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                          Add Projects
                        </Button>
                      )}
                      {/* ================= PROJECTS ================= */}
                      {showProjects && (
                        <div>
                          <Label className="text-md font-semibold">
                            Projects
                          </Label>
                          <AnimatePresence>
                            {projects.map((proj, index) => (
                              <motion.div
                                key={index}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={fadeSlide}
                                transition={{ duration: 0.3 }}
                                className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200"
                              >
                                <Label className="text-sm">
                                  Project {index + 1}
                                </Label>

                                <TextField className="mt-3" isRequired>
                                  <Label>Title</Label>
                                  <Input
                                    value={proj.title}
                                    onChange={(e) =>
                                      handleProjectChange(
                                        index,
                                        "title",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </TextField>

                                <div className="flex justify-between gap-2">
                                  <DatePicker
                                    isRequired
                                    className="w-50 mt-3"
                                    name="date"
                                    onChange={(date) =>
                                      handleProjectChange(
                                        index,
                                        "startDate",
                                        date,
                                      )
                                    }
                                  >
                                    <Label>Start Date</Label>
                                    <DateField.Group fullWidth>
                                      <DateField.Input>
                                        {(segment) => (
                                          <DateField.Segment
                                            segment={segment}
                                          />
                                        )}
                                      </DateField.Input>
                                      <DateField.Suffix>
                                        <DatePicker.Trigger>
                                          <DatePicker.TriggerIndicator />
                                        </DatePicker.Trigger>
                                      </DateField.Suffix>
                                    </DateField.Group>
                                    <DatePicker.Popover>
                                      <Calendar aria-label="Event date">
                                        <Calendar.Header>
                                          <Calendar.YearPickerTrigger>
                                            <Calendar.YearPickerTriggerHeading />
                                            <Calendar.YearPickerTriggerIndicator />
                                          </Calendar.YearPickerTrigger>
                                          <Calendar.NavButton slot="previous" />
                                          <Calendar.NavButton slot="next" />
                                        </Calendar.Header>
                                        <Calendar.Grid>
                                          <Calendar.GridHeader>
                                            {(day) => (
                                              <Calendar.HeaderCell>
                                                {day}
                                              </Calendar.HeaderCell>
                                            )}
                                          </Calendar.GridHeader>
                                          <Calendar.GridBody>
                                            {(date) => (
                                              <Calendar.Cell date={date} />
                                            )}
                                          </Calendar.GridBody>
                                        </Calendar.Grid>
                                        <Calendar.YearPickerGrid>
                                          <Calendar.YearPickerGridBody>
                                            {({ year }) => (
                                              <Calendar.YearPickerCell
                                                year={year}
                                              />
                                            )}
                                          </Calendar.YearPickerGridBody>
                                        </Calendar.YearPickerGrid>
                                      </Calendar>
                                    </DatePicker.Popover>
                                  </DatePicker>
                                  <DatePicker
                                    isRequired
                                    className="w-50 mt-3"
                                    name="date"
                                    onChange={(date) =>
                                      handleProjectChange(
                                        index,
                                        "endDate",
                                        date,
                                      )
                                    }
                                  >
                                    <Label>End Date</Label>
                                    <DateField.Group fullWidth>
                                      <DateField.Input>
                                        {(segment) => (
                                          <DateField.Segment
                                            segment={segment}
                                          />
                                        )}
                                      </DateField.Input>
                                      <DateField.Suffix>
                                        <DatePicker.Trigger>
                                          <DatePicker.TriggerIndicator />
                                        </DatePicker.Trigger>
                                      </DateField.Suffix>
                                    </DateField.Group>
                                    <DatePicker.Popover>
                                      <Calendar aria-label="Event date">
                                        <Calendar.Header>
                                          <Calendar.YearPickerTrigger>
                                            <Calendar.YearPickerTriggerHeading />
                                            <Calendar.YearPickerTriggerIndicator />
                                          </Calendar.YearPickerTrigger>
                                          <Calendar.NavButton slot="previous" />
                                          <Calendar.NavButton slot="next" />
                                        </Calendar.Header>
                                        <Calendar.Grid>
                                          <Calendar.GridHeader>
                                            {(day) => (
                                              <Calendar.HeaderCell>
                                                {day}
                                              </Calendar.HeaderCell>
                                            )}
                                          </Calendar.GridHeader>
                                          <Calendar.GridBody>
                                            {(date) => (
                                              <Calendar.Cell date={date} />
                                            )}
                                          </Calendar.GridBody>
                                        </Calendar.Grid>
                                        <Calendar.YearPickerGrid>
                                          <Calendar.YearPickerGridBody>
                                            {({ year }) => (
                                              <Calendar.YearPickerCell
                                                year={year}
                                              />
                                            )}
                                          </Calendar.YearPickerGridBody>
                                        </Calendar.YearPickerGrid>
                                      </Calendar>
                                    </DatePicker.Popover>
                                  </DatePicker>
                                </div>

                                <TextField isRequired>
                                  <Label className="mt-3">
                                    Project Description
                                  </Label>
                                  <TextArea
                                    value={proj.description}
                                    onChange={(e) =>
                                      handleProjectChange(
                                        index,
                                        "description",
                                        e.target.value,
                                      )
                                    }
                                    className="mt-3"
                                  />
                                </TextField>

                                <TextField isRequired>
                                  <Label className="mt-3">Tech Stack</Label>
                                  <TextArea
                                    value={proj.techStack}
                                    onChange={(e) =>
                                      handleProjectChange(
                                        index,
                                        "techStack",
                                        e.target.value,
                                      )
                                    }
                                    className="mt-3"
                                  />
                                </TextField>

                                <TextField
                                  isRequired
                                  className="w-full mt-3"
                                  name="website"
                                >
                                  <Label>Github</Label>
                                  <InputGroup
                                    value={proj.githubLink}
                                    onChange={(e) =>
                                      handleProjectChange(
                                        index,
                                        "githubLink",
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <InputGroup.Prefix>
                                      <LogoGithub className="size-4 text-muted" />
                                    </InputGroup.Prefix>
                                    <InputGroup.Input className="w-full" />
                                  </InputGroup>
                                </TextField>

                                <TextField
                                  isRequired
                                  className="w-full mt-3"
                                  name="website"
                                >
                                  <Label>Demo</Label>
                                  <InputGroup
                                    value={proj.demoLink}
                                    onChange={(e) =>
                                      handleProjectChange(
                                        index,
                                        "demoLink",
                                        e.target.value,
                                      )
                                    }
                                  >
                                    <InputGroup.Prefix>
                                      <Globe className="size-4 text-muted" />
                                    </InputGroup.Prefix>
                                    <InputGroup.Input className="w-full" />
                                  </InputGroup>
                                </TextField>

                                {index === projects.length - 1 && (
                                  <div className="flex justify-end mt-4 gap-3">
                                    <Button
                                      onClick={handleAddProjects}
                                      size="sm"
                                    >
                                      <Plus /> Add
                                    </Button>

                                    {projects.length > 1 && (
                                      <Button
                                        onClick={() => deleteProject(index)}
                                        isIconOnly
                                        variant="danger-soft"
                                      >
                                        <TrashBin />
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      )}

                      {/* ================= EXPERIENCE BUTTON ================= */}
                      {!showExperience && (
                        <Button
                          onClick={handleAddExperience}
                          size="sm"
                          variant="secondary"
                          className="flex items-center gap-2 w-fit px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                          <Plus className="w-4 h-4" />
                          Add Experience
                        </Button>
                      )}

                      {/* ================= EXPERIENCE ================= */}
                      {showExperience && (
                        <div>
                          <Label className="text-md font-semibold">
                            Experience
                          </Label>
                          <AnimatePresence>
                            {experience.map((exp, index) => (
                              <motion.div
                                key={index}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={fadeSlide}
                                transition={{ duration: 0.3 }}
                                className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200"
                              >
                                <Label className="text-sm">
                                  Experience {index + 1}
                                </Label>

                                <TextField className="mt-3" isRequired>
                                  <Label>Company</Label>
                                  <Input
                                    value={exp.company}
                                    onChange={(e) =>
                                      handleExperienceChange(
                                        index,
                                        "company",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </TextField>

                                <TextField className="mt-3" isRequired>
                                  <Label>Role</Label>
                                  <Input
                                    value={exp.role}
                                    onChange={(e) =>
                                      handleExperienceChange(
                                        index,
                                        "role",
                                        e.target.value,
                                      )
                                    }
                                  />
                                </TextField>

                                <div className="flex justify-between gap-2">
                                  <DatePicker
                                    isRequired
                                    className="w-50 mt-3"
                                    name="date"
                                    onChange={(date) =>
                                      handleExperienceChange(
                                        index,
                                        "startDate",
                                        date,
                                      )
                                    }
                                  >
                                    <Label>Start Date</Label>
                                    <DateField.Group fullWidth>
                                      <DateField.Input>
                                        {(segment) => (
                                          <DateField.Segment
                                            segment={segment}
                                          />
                                        )}
                                      </DateField.Input>
                                      <DateField.Suffix>
                                        <DatePicker.Trigger>
                                          <DatePicker.TriggerIndicator />
                                        </DatePicker.Trigger>
                                      </DateField.Suffix>
                                    </DateField.Group>
                                    <DatePicker.Popover>
                                      <Calendar aria-label="Event date">
                                        <Calendar.Header>
                                          <Calendar.YearPickerTrigger>
                                            <Calendar.YearPickerTriggerHeading />
                                            <Calendar.YearPickerTriggerIndicator />
                                          </Calendar.YearPickerTrigger>
                                          <Calendar.NavButton slot="previous" />
                                          <Calendar.NavButton slot="next" />
                                        </Calendar.Header>
                                        <Calendar.Grid>
                                          <Calendar.GridHeader>
                                            {(day) => (
                                              <Calendar.HeaderCell>
                                                {day}
                                              </Calendar.HeaderCell>
                                            )}
                                          </Calendar.GridHeader>
                                          <Calendar.GridBody>
                                            {(date) => (
                                              <Calendar.Cell date={date} />
                                            )}
                                          </Calendar.GridBody>
                                        </Calendar.Grid>
                                        <Calendar.YearPickerGrid>
                                          <Calendar.YearPickerGridBody>
                                            {({ year }) => (
                                              <Calendar.YearPickerCell
                                                year={year}
                                              />
                                            )}
                                          </Calendar.YearPickerGridBody>
                                        </Calendar.YearPickerGrid>
                                      </Calendar>
                                    </DatePicker.Popover>
                                  </DatePicker>
                                  <DatePicker
                                    isRequired
                                    className="w-50 mt-3"
                                    name="date"
                                    onChange={(date) =>
                                      handleExperienceChange(
                                        index,
                                        "endDate",
                                        date,
                                      )
                                    }
                                  >
                                    <Label>End Date</Label>
                                    <DateField.Group fullWidth>
                                      <DateField.Input>
                                        {(segment) => (
                                          <DateField.Segment
                                            segment={segment}
                                          />
                                        )}
                                      </DateField.Input>
                                      <DateField.Suffix>
                                        <DatePicker.Trigger>
                                          <DatePicker.TriggerIndicator />
                                        </DatePicker.Trigger>
                                      </DateField.Suffix>
                                    </DateField.Group>
                                    <DatePicker.Popover>
                                      <Calendar aria-label="Event date">
                                        <Calendar.Header>
                                          <Calendar.YearPickerTrigger>
                                            <Calendar.YearPickerTriggerHeading />
                                            <Calendar.YearPickerTriggerIndicator />
                                          </Calendar.YearPickerTrigger>
                                          <Calendar.NavButton slot="previous" />
                                          <Calendar.NavButton slot="next" />
                                        </Calendar.Header>
                                        <Calendar.Grid>
                                          <Calendar.GridHeader>
                                            {(day) => (
                                              <Calendar.HeaderCell>
                                                {day}
                                              </Calendar.HeaderCell>
                                            )}
                                          </Calendar.GridHeader>
                                          <Calendar.GridBody>
                                            {(date) => (
                                              <Calendar.Cell date={date} />
                                            )}
                                          </Calendar.GridBody>
                                        </Calendar.Grid>
                                        <Calendar.YearPickerGrid>
                                          <Calendar.YearPickerGridBody>
                                            {({ year }) => (
                                              <Calendar.YearPickerCell
                                                year={year}
                                              />
                                            )}
                                          </Calendar.YearPickerGridBody>
                                        </Calendar.YearPickerGrid>
                                      </Calendar>
                                    </DatePicker.Popover>
                                  </DatePicker>
                                </div>

                                <TextField isRequired>
                                  <Label className="mt-3">
                                    Role Description
                                  </Label>
                                  <TextArea
                                    value={exp.description}
                                    onChange={(e) =>
                                      handleExperienceChange(
                                        index,
                                        "description",
                                        e.target.value,
                                      )
                                    }
                                    className="mt-3"
                                  />
                                </TextField>

                                <TextField isRequired>
                                  <Label className="mt-3">Tech Stack</Label>
                                  <TextArea
                                    value={exp.techStack}
                                    onChange={(e) =>
                                      handleExperienceChange(
                                        index,
                                        "techStack",
                                        e.target.value,
                                      )
                                    }
                                    className="mt-3"
                                  />
                                </TextField>

                                {/* <TextField isRequired>
                                  <Label className="mt-3">Place</Label>
                                  <Input
                                    value={exp.location}
                                    onChange={(e) =>
                                      handleExperienceChange(
                                        index,
                                        "location",
                                        e.target.value,
                                      )
                                    }
                                    className="mt-3"
                                  />
                                </TextField> */}

                                {index === experience.length - 1 && (
                                  <div className="flex justify-end mt-4 gap-3">
                                    <Button
                                      onClick={handleAddExperience}
                                      size="sm"
                                    >
                                      <Plus /> Add
                                    </Button>

                                    {experience.length > 1 && (
                                      <Button
                                        onClick={() => deleteExperience(index)}
                                        isIconOnly
                                        variant="danger-soft"
                                      >
                                        <TrashBin />
                                      </Button>
                                    )}
                                  </div>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label isRequired>Technical Skills</Label>
                    <TextField>
                      <TextArea
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      ></TextArea>
                    </TextField>
                  </div>
                  <div>
                    <Label isRequired>Languages Known</Label>
                    <TextField>
                      <TextArea
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                      ></TextArea>
                    </TextField>
                  </div>
                  <div>
                    <Label>Certifications (if any)</Label>
                    <TextField>
                      <TextArea
                        value={certifications}
                        onChange={(e) => setCertifications(e.target.value)}
                      ></TextArea>
                    </TextField>
                  </div>
                </FieldGroup>
                <Fieldset.Actions>
                  <Button type="submit">
                    <FloppyDisk />
                    Save changes
                  </Button>
                </Fieldset.Actions>
              </Fieldset>
            </Form>
          </Card>
        </div>

        <AnimatePresence>
          {hasStartedTyping && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex justify-center items-start pt-2"
            >
              <div className="w-full max-w-187.5 bg-white shadow-xl rounded-xl overflow-hidden">
                <ResumeLayout resume={transformToResume()} mode="preview" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default ResumeForm;
