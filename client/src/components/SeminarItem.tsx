import { FC, useState } from "react";
import { Seminar } from "./Seminars";
import IconClock from "../assets/icons8-часы.gif"
import IconGarbage from "../assets/icons8-мусорка-64.png"
import IconEdit from "../assets/icons8-редактировать-100.png"
import { EditModal } from "./EditModal";
import DeleteModal from "./DeleteModal";

interface SeminarItemProps {
    seminar: Seminar;
    onDelete: (id: number) => void;
    onEdit: (updatedSeminar: Seminar) => void;
}

export const SeminarItem: FC<SeminarItemProps> = ({ seminar, onDelete, onEdit }) => {
    //Стейты для управления модальными окнами
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);


    const handleEditClick = () => {
        setIsEditModalOpen(true);
    };
    const handleSaveEdit = (updatedSeminar: Seminar) => {
        onEdit(updatedSeminar);
        setIsEditModalOpen(false);
    };

    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };
    const handleCloseDeleteModal = () => {
        setIsModalOpen(false);
    };

    const {
        id,
        title,
        description,
        date,
        time,
        photo
    } = seminar
    return (
        <div className="bg-white rounded-2xl p-6 shadow">
            <div className="w-full max-w-[340px] flex flex-col gap-3">
                <img src={photo} className="rounded-2xl w-full h-56 object-cover " alt="seminarPhoto" />

                <div className="flex flex-col gap-1  h-56">

                    <h3 className="text-xl font-bold">{title}</h3>

                    <span className="font-medium">{date}</span>

                    <p>{description}</p>

                    <div className="flex justify-between gap-1 mt-auto ">
                        <div>
                            <img className="size-6" src={IconClock} alt="" />
                            <span>{time}</span>
                        </div>

                        <div className="flex gap-4">
                            <img onClick={handleEditClick} src={IconEdit} className="size-9 cursor-pointer hover:bg-gray-100  rounded-xl p-1" alt="editIcon" />
                            <img onClick={handleDeleteClick} src={IconGarbage} className="size-9 cursor-pointer  hover:bg-gray-100 p-1 rounded-xl" alt="" />
                        </div>
                    </div>
                </div>

            </div>
            <EditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                seminar={seminar}
                onSave={handleSaveEdit}
            />
            <DeleteModal isOpen={isModalOpen} onClose={handleCloseDeleteModal} onDelete={() => onDelete(id)} />
        </div>
    )
};
