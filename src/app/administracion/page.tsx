'use client'

import {listAll, ref} from "@firebase/storage";
import storage from "@/lib/firebase/storage";
import {useEffect} from "react";

export default function Page() {
    async function listFolders(path = '/') {
        try {
            const listResult = await listAll(ref(storage, path));
            console.log(listResult);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        listFolders('/Servicio Administrativo');
    }, []);
    return (
        <div>
            admin page
        </div>
    )
}
