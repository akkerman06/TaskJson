import { useEffect, useState } from "react";
import { api } from "../api";
import { SeminarItem } from "./SeminarItem";
import { SkeletonSeminars } from "./SkeletonSeminars";
import { useNotifications } from "./notification";

export interface Seminar {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    photo: string;
}


export const Seminars = () => {
    // Стейт для хранение семинаров
    const [seminars, setSeminars] = useState<Seminar[]>([])

    const [loading, setLoading] = useState<Boolean>(true)
    const [error, setError] = useState<string | null>(null);

    const { showNotification, Notifications } = useNotifications();// Хук уведомлений


    // Получение семинаров
    useEffect(() => {
        api.get("/seminars")
            .then(function (res) {
                setSeminars(res.data)
                setLoading(false)

            })
            .catch(function (err) {
                setError(err.message)
                setLoading(false)

            })
    }, [])


    //Функция редактирования семинара
    const handleEdit = async (updatedSeminar: Seminar) => {
        api.put(`/seminars/${updatedSeminar.id}`, updatedSeminar).then(function () {
            setSeminars(seminars.map(seminar => seminar.id === updatedSeminar.id ? updatedSeminar : seminar))
            showNotification("Семинар успешно обновлен", "success");
        }).catch(function (err) {
            showNotification(`${err}`, "error");
        })
    };

    //Функция удаления семинара
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`/seminars/${id}`);
            setSeminars(seminars.filter(seminar => seminar.id !== id))
            showNotification("Семинар успешно удален", "success");
        } catch (err) {
            showNotification(`${err}`, "error");

        }
    };


    return (
        <div className="flex flex-wrap justify-center gap-6">
            {
                loading ? (
                    <SkeletonSeminars />
                ) : error ? (
                    <div className="text-3xl text-center text-red-600">{error}</div>

                ) : (
                    seminars.map(seminar => (
                        <SeminarItem
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            key={seminar.id}
                            seminar={seminar}
                        />
                    ))
                )
            }
            <Notifications />


        </div>
    )
};
