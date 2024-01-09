import { createContext } from "react";

const EditPostContext = createContext({
  noteState: {
    id: '',
    content: '',
  }
})

export default EditPostContext;