import React from "react";
import { StyledRegisterVideo } from "./style";

function useForm(){
    const [values, setValues] = React.useState({titulo: "", url:""})

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


export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValue: {titulo: "testando custom", url:"olar hook"}
    })
    const [formVisivel, setFormVisivel] = React.useState(false)
    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            
            { formVisivel ? 
            <form>
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