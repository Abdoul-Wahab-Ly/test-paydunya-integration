const Home = () => {
  const submitForm = async () => {
    const form = document.getElementById("paydunyaForm");
    const formData = new FormData(form);
    console.log(formData);
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });

    try {
      const response = await fetch("/api/paydunya", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });

      if (!response.ok) {
        throw new Error(`Transaction failed: ${response.statusText}`);
      }

      const result = await response.json();
      window.location.href = result.url; // Redirect to PayDunya checkout URL
    } catch (error) {
      console.error(error);
      // Handle error, show a message to the user, etc.
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-blue-500">
        PayDunya Checkout
      </h2>
      <form id="paydunyaForm">
        <div className="mb-4">
          <label
            htmlFor="item"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nom du produit:
          </label>
          <input
            type="text"
            id="item"
            name="item"
            className="border rounded-md w-full p-2"
            required={true}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Quantité:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            className="border rounded-md w-full p-2"
            required={true}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="unitPrice"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Prix unitaire:
          </label>
          <input
            type="number"
            id="unitPrice"
            name="unit_price"
            className="border rounded-md w-full p-2"
            required={true}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description du produit:
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded-md w-full p-2"
            required={true}
          ></textarea>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={submitForm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Payer maintenant
          </button>
        </div>
      </form>
    </div>
  );
};

export default Home;
