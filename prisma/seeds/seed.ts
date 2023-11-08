import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const employment = await prisma.employment_type.createMany({
        data: [
            {
                name: 'FULL_DAY'
            },
            {
                name: 'FULL_DAY'
            },
            {
                name: 'REMOTE'
            },
            {
                name: 'SHIFT_WORK'
            },
        ]
    })
    const schedule = await prisma.working_schedule.createMany({
        data: [
            {
                name: 'FULL_TIME'
            },
            {
                name: 'INTERNSHIP'
            },
            {
                name: 'PART_TIME'
            },
            {
                name: 'PROJECT_WORK'
            }
        ]
    })
}

main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async err => {
    console.log(err);
    await prisma.$disconnect()
    process.exit(1);
})