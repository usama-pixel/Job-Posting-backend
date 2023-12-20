var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const employment = yield prisma.employment_type.createMany({
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
        });
        const schedule = yield prisma.working_schedule.createMany({
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
        });
    });
}
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((err) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(err);
    yield prisma.$disconnect();
    process.exit(1);
}));
//# sourceMappingURL=seed.js.map