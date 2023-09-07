import { faker } from "@faker-js/faker";

const MIN_MEMBER = 10,
    MAX_MEMEBER = 100;
const MIN_MONEY = 100,
    MAX_MONEY = 400;

const activityList = [
    ...(function* (i) {
        for (let j = 0; j < i; j++)
            yield {
                id: crypto.randomUUID(),
                designation: faker.word.words(1),
                description: faker.word.words({ count: { min: 30, max: 50 } }),
                start: new Date().toISOString(),
                end: new Date(Date.now() + 99999 ** 2).toISOString(),
                cycle: faker.word.words(1),
                amount_to_give: "",
                status: ["inProgress", "completed"][faker.number.int(1)],
                members: faker.number.int({
                    min: MIN_MEMBER,
                    max: MAX_MEMEBER,
                }),
                currency: ["USD", "FC"][faker.number.int(1)],
                amountToGive: faker.number.int({
                    min: MIN_MONEY,
                    max: MAX_MONEY,
                }),
            };
    })(20),
];

const user = {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    remember_me_token: faker.string.uuid(),
};

const members = [
    ...(function* (i) {
        for (let j = 0; j < i; j++) {
            yield {
                id: faker.string.uuid(),
                name: faker.person.firstName(),
                postname: faker.person.lastName(),
                phone: faker.phone.number("+243 9## ### ###"),
                next: faker.date.future().toISOString(),
            };
        }
    })(10),
].sort((a, b) => new Date(a.next).getTime() - new Date(b.next).getTime());

export { activityList, user, members };
