const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false
		},
		actions: {
			login: (email,password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type':'application/json'},
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					)
				};
				fetch("https://germanebarbosa-studious-space-funicular-j64wgj5jpw7cp5p6-3001.preview.app.github.dev/api/login", requestOptions)
					.then(response => {
						console.log(response.status); //imprimo la validacion del codigo, 200 es correcto 401 significa error.
						if( response.status === 200 ){
							setStore({auth: true}) // Modifico el valor de la variable auth.
						}
						return response.json();
					})
					.then(data => {
						localStorage.setItem("token", data.access_token)
						console.log(data)
					});
			},

			logout:()=>{
				setStore({auth: false}) 
				localStorage.remove("token")
				console.log("funciona");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
