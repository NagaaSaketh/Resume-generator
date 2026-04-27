import React from "react";
import Menu from "./Menu";
import { Card, Button } from "@heroui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ResumeLayout from "./ResumeLayout";
const SavedResumes = () => {
  const resumes = useSelector((store) => store.resume);
  console.log(resumes);

  return (
    <>
      <div className="flex items-center justify-between pt-5 m-4">
        <h1 className="text-xl font-extrabold">
          {resumes.length > 0 ? "My Resumes" : "No Resumes found!"}
        </h1>

        {resumes.length === 0 && (
          <Link to="/app">
            <Button variant="primary">Create Resume</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Array.isArray(resumes) &&
          resumes.map((resume) => (
            <Link key={resume._id} to={`/app/resumes/${resume._id}`}>
              <Card className="relative h-62.5 sm:h-75 md:h-87.5 overflow-hidden cursor-pointer hover:scale-105 transition">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="scale-[0.3] origin-top-left w-250 pointer-events-none">
                    <ResumeLayout resume={resume} mode="preview" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/20 z-10" />
                <Card.Footer className="z-20 mt-auto flex items-end justify-between">
                  <div>
                    <div className="text-base font-medium text-white sm:text-lg">
                      {resume.title}
                    </div>
                    <div className="text-xs text-white/70 sm:text-sm">
                      Created on{" "}
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Card.Footer>
              </Card>
            </Link>
          ))}
      </div>
    </>
  );
};

export default SavedResumes;
