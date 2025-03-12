import { FC, useState, useEffect } from 'react';
import { Seminar } from './Seminars';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    seminar: Seminar;
    onSave: (updatedSeminar: Seminar) => void;
}

export const EditModal: FC<EditModalProps> = ({ isOpen, onClose, seminar, onSave }) => {

    // Стейт для хранения данный семинара
    const [formData, setFormData] = useState<Seminar>(seminar);

    //Стейт для хранения изображения
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    //Стейт для хранения превью изображения
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // Синхронизации данных и управление скроллом страницы 
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        }
        setFormData(seminar);
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [seminar, isOpen]);


    // Обработчик изменения текстовых полей
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    setPreviewUrl(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFile) {
            // Обработка файла перед сохранением
            const formDataToSave: Seminar = { ...formData, photo: URL.createObjectURL(selectedFile) };
            onSave(formDataToSave);
        } else {
            onSave(formData);
        }
        onClose();
    };

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 
            ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>

            <div
                className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500
                    ${isOpen ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            />

            <div
                className={`relative w-full max-w-2xl bg-white rounded-2xl p-6 shadow-xl transform transition-all duration-300
                    ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>

                <h2 className="text-2xl font-bold mb-4">Редактировать семинар</h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                    {/* Левая колонка */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Название</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Дата</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Время</label>
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Правая колонка */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Фото</label>
                            <div className="flex gap-4">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                                {previewUrl && (
                                    <img src={previewUrl} alt="Selected Image" className="w-24 h-24 object-cover" />
                                )}
                                {!previewUrl && (
                                    <input
                                        type="text"
                                        name="photo"
                                        value={formData.photo}
                                        onChange={handleChange}
                                        placeholder="URL"
                                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Описание</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="col-span-2 flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Сохранить изменения
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
