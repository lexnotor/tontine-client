import { useAppContext } from "@/context";
import AddMember from "./AddMember";
import DeleteMember from "./DeleteMember";
import AddFee from "./AddFee";
import CreateActivity from "./CreateActivity";

const ModalManager = () => {
    const { addingMember, deletingMember, savingFees, creatingActivity } =
        useAppContext();
    return addingMember?.now ? (
        <AddMember />
    ) : deletingMember?.now ? (
        <DeleteMember />
    ) : savingFees?.now ? (
        <AddFee />
    ) : creatingActivity?.now ? (
        <CreateActivity />
    ) : (
        <></>
    );
};

export default ModalManager;
