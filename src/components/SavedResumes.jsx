import React from "react";
import Menu from "./Menu";
import { Card, Button } from "@heroui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { resume } from "react-dom/server";
import { div } from "framer-motion/client";
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
          <Link to="/">
            <Button variant="primary">
              Create Resume
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Array.isArray(resumes) &&
          resumes.map((resume) => (
            <Link key={resume._id} to={`/resumes/${resume._id}`}>
              <Card className="relative h-62.5 sm:h-75 md:h-87.5 translate-y-2 hover:translate-y-1 transition duration-300">
                <img
                  alt="NEO Home Robot"
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover"
                  src="https://placehold.co/400?text=Resume"
                />
                <Card.Footer className="z-10 mt-auto flex items-end justify-between">
                  <div>
                    <div className="text-base font-medium text-black sm:text-lg">
                      {resume.title}
                    </div>
                    <div className="text-xs font-medium text-black/50 sm:text-sm">
                      <p>
                        Created on{" "}
                        {new Date(resume.createdAt).toLocaleDateString()}
                      </p>
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
