import { useAppContext } from "@/context";
import AddMember from "./AddMember";
import DeleteMember from "./DeleteMember";
import AddFee from "./AddFee";

const ModalManager = () => {
    const { addingMember, deletingMember, savingFees } = useAppContext();
    return addingMember?.now ? (
        <AddMember />
    ) : deletingMember?.now ? (
        <DeleteMember />
    ) : savingFees?.now ? (
        <AddFee />
    ) : (
        <></>
    );
};

export default ModalManager;
