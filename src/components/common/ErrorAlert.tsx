interface Props {
    title: string;
    message: string;
}

export default function ErrorAlert({
    title,
    message,
}: Props) {

    return (

        <div
            role="alert"
            className="
                rounded-xl
                border
                border-red-500/40
                bg-red-500/10
                p-4
            "
        >

            <h3 className="font-semibold text-red-400">

                {title}

            </h3>

            <p className="mt-1 text-sm text-red-200">

                {message}

            </p>

        </div>

    );

}