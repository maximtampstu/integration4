import { Link, Form } from "react-router";

export async function clientAction({ request }) {
    const data = await request.formData()
    const info = data.get("testInput")
    console.log("Form submitted with value:", info);
  }

const Test = () => {

    return (
        <Form method="post">
            <input type="text" name="testInput" />
            <button type="submit">Submit</button>
        </Form>
    );
};

export default Test;