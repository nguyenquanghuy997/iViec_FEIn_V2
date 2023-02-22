FROM registry.fke.fptcloud.com/b54a72e1-3693-4e3f-8f90-0638f7474357/next-fe:base as base

FROM registry.fke.fptcloud.com/b54a72e1-3693-4e3f-8f90-0638f7474357/next-fe:builder as builder

FROM registry.fke.fptcloud.com/b54a72e1-3693-4e3f-8f90-0638f7474357/next-fe:runtime as runtime

CMD ["server.js"]