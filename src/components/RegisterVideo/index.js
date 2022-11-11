import { createClient } from "@supabase/supabase-js";
import React from "react";
import { StyledRegisterVideo } from "./style";

function useForm(props){
    const [values, setValues] = React.useState(props.initialValues)

    return {
        values,
        handleChange: (evento) => {
            console.log(evento.target);
            const value = evento.target.value;
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL="https://pqgvvhazvgkwthjccyoy.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBxZ3Z2aGF6dmdrd3RoamNjeW95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxOTA1MTUsImV4cCI6MTk4Mzc2NjUxNX0.FYhZT7Od_0lNrE0FmawjkjaBJGIkccXP2xNRNxNsw6E"
const supabase = createClient(PROJECT_URL,PUBLIC_KEY)

function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}
export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: {titulo: "Frost punk", url:"https://www.youtube.com/watch?v=QsqatJxAUtk"}
    })
    const [formVisivel, setFormVisivel] = React.useState(false)
    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            
            { formVisivel ? 
            <form onSubmit={(evento) =>{
                evento.preventDefault();
                supabase.from("video").insert({
                    title: formCadastro.values.titulo,
                    url: formCadastro.values.url,
                    thumb: getThumbnail(formCadastro.values.url),
                    playlist: "jogos"
                })
                .then((oqueveio) => {
                    console.log(oqueveio);
                })
                .catch((err)=>{
                    console.log(err)
                })
            }}>
                <div>
                    <button className="close-modal" onClick={() => setFormVisivel(false)}>
                        X
                    </button>
                    <input
                        placeholder="Titulo do vídeo"
                        name="titulo"
                        value={formCadastro.values.titulo}
                        onChange={formCadastro.handleChange}
                    />
                    <input
                        placeholder="URL"
                        name="url"
                        value={formCadastro.values.url}
                        onChange={formCadastro.handleChange}
                    />
                    <button type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
            : null }
        </StyledRegisterVideo>
    )
}