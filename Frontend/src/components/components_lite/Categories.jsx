import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";
import { FaReact, FaServer, FaProductHunt, FaUserTie } from "react-icons/fa";
import { Code2, Database, Globe2, Cpu, Brain, Shield, Settings, Palette, Video } from "lucide-react";

const categories = [
  { name: "Frontend Developer", icon: <FaReact className="h-7 w-7 text-emerald-600" /> },
  { name: "Backend Developer", icon: <FaServer className="h-7 w-7 text-emerald-600" /> },
  { name: "Full Stack Developer", icon: <Globe2 className="h-7 w-7 text-emerald-600" /> },
  { name: "Mern Developer", icon: <Code2 className="h-7 w-7 text-emerald-600" /> },
  { name: "Data Scientist", icon: <Database className="h-7 w-7 text-emerald-600" /> },
  { name: "DevOps Engineer", icon: <Settings className="h-7 w-7 text-emerald-600" /> },
  { name: "Machine Learning Engineer", icon: <Brain className="h-7 w-7 text-emerald-600" /> },
  { name: "AI Engineer", icon: <Cpu className="h-7 w-7 text-emerald-600" /> },
  { name: "Cybersecurity Engineer", icon: <Shield className="h-7 w-7 text-emerald-600" /> },
  { name: "Product Manager", icon: <FaProductHunt className="h-7 w-7 text-emerald-600" /> },
  { name: "UX/UI Designer", icon: <Palette className="h-7 w-7 text-emerald-600" /> },
  { name: "Graphics Engineer", icon: <Settings className="h-7 w-7 text-emerald-600" /> },
  { name: "Graphics Designer", icon: <FaUserTie className="h-7 w-7 text-emerald-600" /> },
  { name: "Video Editor", icon: <Video className="h-7 w-7 text-emerald-600" /> },
];

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchjobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="py-16 bg-gradient-to-r from-green-100 via-green-200 to-green-100">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-emerald-900">Job Categories</h1>
        <p className="text-emerald-700 mt-2">
          Explore roles across industries and start your career journey.
        </p>
      </div>

      <Carousel className="w-full max-w-6xl mx-auto">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem 
              key={index} 
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 px-3 py-4 flex justify-center"
            >
              <div
                onClick={() => searchjobHandler(category.name)}
                className="w-full cursor-pointer bg-white border border-emerald-300 rounded-lg 
                           p-6 flex flex-col items-center text-center 
                           hover:border-emerald-600 hover:shadow-lg transition duration-200 shadow-sm"
              >
                <div className="mb-3">{category.icon}</div>
                <h3 className="text-emerald-900 font-medium">{category.name}</h3>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious 
          className="bg-white border border-emerald-300 text-emerald-700 
                     hover:border-emerald-600 hover:text-emerald-700 transition" 
        />
        <CarouselNext 
          className="bg-white border border-emerald-300 text-emerald-700 
                     hover:border-emerald-600 hover:text-emerald-700 transition" 
        />
      </Carousel>
    </div>
  );
};

export default Categories;
