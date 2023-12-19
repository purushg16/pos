import { create } from "zustand";
import { Employee } from "../services/employe-client";
import { GST } from "../services/gst-client";

interface EmployeStore {
  gstList: GST[];
  setGSTList: ([]: GST[]) => void;
  currentGstin: GST | null;
  setGstin: (gsting: GST) => void;
}

const useGSTStore = create<EmployeStore>((set) => ({
  gstList: [],
  currentGstin: null,
  setGSTList: (gstins) => set(() => ({ gstList: gstins })),
  setGstin: (gstin) => set(() => ({ currentGstin: gstin })),
}));

export default useGSTStore;
