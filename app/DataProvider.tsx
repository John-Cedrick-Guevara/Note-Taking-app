"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// 1. Define the shape of your data
interface Data {
  // Replace these with your actual data fields
  id: number;
  name: string;
  email: string;
}

// 2. Define the context type
interface DataContextType {
  data: Data[] | null;
  setData: React.Dispatch<React.SetStateAction<Data[] | null>>;
  userId : string
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}

// 3. Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// 4. Create a provider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState("")
  const [data, setData] = useState<Data[] | null>(null); // State to store fetched data


  console.log(userId) ;
  

  // 5. Fetch data when the provider mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data[]>('/api/users' ,{params : {id : userId}}); // Update with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    // storing the userId on localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

    // Save userId to localStorage whenever it changes
    useEffect(() => {
      if (userId !== null) {
        localStorage.setItem("userId", userId);
      }
    }, [userId]);
  

  return (
    <DataContext.Provider value={{ data, setData , userId, setUserId}}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook for easier access to context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
