const getProblemName = () => {
    const url = document.URL.split('/');

    for (let i = 0; i < url.length; i++) {
        if (url[i] === 'problems') {
            return url[i + 1];
        }
    }
};

const getCsrfToken = () => {
    return document.cookie
        .split(';')
        .find((v) => v.trim().startsWith('csrftoken'))
        .split('=')
        .pop();
};

const getThousands = (number) => {
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    }

    return number.toString();
};

const run = async () => {
    const problemName = getProblemName();

    const body = {
        query: 'query questionTitle($titleSlug: String!) { question(titleSlug: $titleSlug) { dislikes }}',
        variables: { titleSlug: `${problemName}` },
        operationName: 'questionTitle',
    };

    const response = await fetch('https://leetcode.com/graphql/', {
        headers: {
            'content-type': 'application/json',
            'X-Csrftoken': getCsrfToken(),
        },
        body: JSON.stringify(body),
        method: 'POST',
        credentials: 'include',
    });

    const { data } = await response.json();
    const { dislikes } = data.question;

    const node = document.createElement('div');

    node.innerHTML = getThousands(dislikes);

    const append = (timer) => {
        setTimeout(() => {
            const elements = document.querySelectorAll(
                '[data-icon="thumbs-down"]',
            );

            // Still loading, wait and try again
            if (elements.length === 0) {
                append(timer);

                return;
            }

            if (elements.length > 1) {
                throw new Error('LeetCode has changed the UI');
            }

            const el = elements[0];

            el.parentElement.parentElement.appendChild(node);
        }, timer);
    };

    append(1000);
};

run();
