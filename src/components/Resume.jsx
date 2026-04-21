import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumePDF from "../components/ResumePDF";
import ResumeLayout from "./ResumeLayout";
import { ArrowDownToSquare, TrashBin, CircleInfo } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";

const Resume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  const resumeDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/resumes/${id}`, {
        withCredentials: true,
      });
      setResume(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    resumeDetails();
  }, [id]);

  return (
    <div className="bg-gray-200 min-h-screen py-10">
      <div className="flex items-center justify-center mb-4 gap-4">
        {resume && (
          <PDFDownloadLink
            document={<ResumePDF resume={resume} />}
            fileName="resume.pdf"
          >
            {({ loading }) =>
              loading ? (
                "Preparing PDF..."
              ) : (
                <Button variant="primary">
                  <ArrowDownToSquare className="w-4 h-4" />{" "}
                  <span>Download PDF</span>
                </Button>
              )
            }
          </PDFDownloadLink>
        )}

        <Modal>
          <Button variant="danger">
            <TrashBin />
            Delete
          </Button>

          <Modal.Backdrop isDismissable={false}>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-90">
                <Modal.CloseTrigger />

                <Modal.Header>
                  <Modal.Icon>
                    <CircleInfo className="size-5" />
                  </Modal.Icon>
                  <Modal.Heading>Delete Resume</Modal.Heading>
                  <p className="text-sm text-muted">
                    This action cannot be undone
                  </p>
                </Modal.Header>

                <Modal.Body>
                  <p>Are you sure you want to delete this resume?</p>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="secondary" slot="close">
                    Cancel
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() => {
                      console.log("delete api");
                    }}
                  >
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>

      {resume ? (
        <ResumeLayout resume={resume} />
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default Resume;
