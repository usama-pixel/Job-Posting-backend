import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    const employment = await prisma.employment_type.createMany({
        data: [
            { name: 'FULL_DAY' },
            { name: 'FLEXIBLE' },
            { name: 'REMOTE' },
            { name: 'SHIFT_WORK' },
        ]
    })
    const schedule = await prisma.working_schedule.createMany({
        data: [
            { name: 'FULL_TIME' },
            { name: 'INTERNSHIP' },
            { name: 'PART_TIME' },
            { name: 'PROJECT_WORK' },
        ]
    })
    const countries = await prisma.countries.createMany({
        data: [
            { name: 'Japan' },
            { name: 'Malaysia' },
            { name: 'Turkey' },
            { name: 'Germany' },
            { name: 'South Korea' },
            { name: 'Singapore' },
        ]
    })
    const experiece = await prisma.experience_level.createMany({
        data: [
            { name: '1-2 years' },
            { name: '3-5 years' },
            { name: '5-8 years' },
            { name: '8+ years' },
        ]
    })
    const tags = await prisma.tags.createMany({
        data: [
            { name: 'reactjs' },
            { name: 'nodejs' },
            { name: 'nestjs' },
            { name: 'git' },
            { name: 'asp.net core' },
            { name: 'typescript' },
            { name: 'express' },
            { name: 'mongoose' },
            { name: 'angular' },
            { name: 'vuejs' },
            { name: 'docker' },
            { name: 'kubernetes' },
            { name: 'flutter' },
            { name: 'dart' },
            { name: 'ruby' },
            { name: 'rails' },
            { name: 'python' },
            { name: 'django' },
            { name: 'flask' },
            { name: 'java' },
            { name: 'spring-boot' },
            { name: 'kotlin' },
            { name: 'gradle' },
            { name: 'maven' },
            { name: 'php' },
            { name: 'laravel' },
            { name: 'symfony' },
            { name: 'wordpress' },
            { name: 'drupal' },
            { name: 'css' },
            { name: 'html' },
            { name: 'javascript' },
            { name: 'jquery' },
            { name: 'bootstrap' },
            { name: 'tailwind-css' },
            { name: 'scss' },
            { name: 'sass' },
            { name: 'less' },
            { name: 'styled-components' },
            { name: 'graphql' },
            { name: 'apollo' },
            { name: 'prisma' },
            { name: 'sql' },
            { name: 'mysql' },
            { name: 'postgresql' },
            { name: 'sqlite' },
            { name: 'mongodb' },
            { name: 'redis' },
            { name: 'aws' },
            { name: 'azure' },
            { name: 'gcp' },
            { name: 'serverless' },
            { name: 'firebase' },
            { name: 'heroku' },
            { name: 'netlify' },
            { name: 'vercel' },
            { name: 'jenkins' },
            { name: 'travis-ci' },
            { name: 'circleci' },
            { name: 'github-actions' },
            { name: 'gitlab-ci' },
            { name: 'bitbucket-pipelines' },
            { name: 'webpack' },
            { name: 'rollup' },
            { name: 'parcel' },
            { name: 'eslint' },
            { name: 'prettier' },
            { name: 'jest' },
            { name: 'mocha' },
            { name: 'chai' },
            { name: 'cypress' },
            { name: 'puppeteer' },
            { name: 'storybook' },
            { name: 'nextjs' },
            { name: 'gatsby' },
            { name: 'nuxtjs' },
            { name: 'gridsome' },
            { name: 'svelte' },
            { name: 'redux' },
            { name: 'mobx' },
            { name: 'vuex' },
            { name: 'rxjs' },
            { name: 'lodash' },
            { name: 'underscore' },
            { name: 'd3' },
            { name: 'threejs' },
            { name: 'babel' },
            { name: 'gulp' },
            { name: 'grunt' },
            { name: 'browserify' },
            { name: 'yeoman' },
            { name: 'npm' },
            { name: 'yarn' },
            { name: 'pnpm' },
            { name: 'linux' },
            { name: 'ubuntu' },
            { name: 'debian' },
            { name: 'centos' },
            { name: 'fedora' },
            { name: 'windows' },
            { name: 'macos' },
            { name: 'bash' },
            { name: 'powershell' },
            { name: 'zsh' },
            { name: 'fish' },
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