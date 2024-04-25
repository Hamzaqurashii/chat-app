import { mainMessage } from "../repositories/message.repository";

export const getMessage = async (data: any) => {
  try {
    const m =   await new mainMessage().saveMessage(data.message);
    console.log(m,'ssss')
    
  } catch (error) {
      console.log(error)
  }

  let message = await new mainMessage().getAllMessages(data.roomId);
  return message;
};
