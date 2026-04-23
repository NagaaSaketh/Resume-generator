import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import ResumeLayout from "./ResumeLayout";
import { ArrowDownToSquare, TrashBin, CircleInfo } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import toast from "react-hot-toast";

const Resume = () => {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const resumeRef = useRef();
  const navigate = useNavigate();

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

  const handleDeleteResume = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/resumes/${id}`, {
        withCredentials: true,
      });
      setResume(null);
      toast.success("Resume deleted!");
      navigate("/resumes")
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const downloadPDF = () => {
    document.body.classList.add("pdf-safe");

    html2pdf()
      .set({
        margin: 5,
        filename: "resume.pdf",
        html2canvas: { scale: 4, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(resumeRef.current)
      .save()
      .then(() => {
        document.body.classList.remove("pdf-safe");
      });
  };

  return (
    <div style={{ backgroundColor: "#e5e7eb" }} className="min-h-screen py-10">
      <div className="flex items-center justify-center mb-4 gap-4">
        {resume && (
          <Button variant="primary" onClick={downloadPDF}>
            <ArrowDownToSquare /> Download PDF
          </Button>
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

                  <Button variant="danger" onClick={handleDeleteResume}>
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
      </div>

      {resume ? (
        <div
          ref={resumeRef}
          style={{
            backgroundColor: "#ffffff",
            color: "#000000",
          }}
        >
          <ResumeLayout resume={resume} mode="final" />
        </div>
      ) : (
        <div className="text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default Resume;
