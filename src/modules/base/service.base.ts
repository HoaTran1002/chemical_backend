class Calculator {
  add(a: string, b: string): string

  add(a: number, b: number): number

  add(a: any, b: any): any {
    setTimeout(() => {
      a + 10 + b + 20
    }, 1000)
    return a + b
  }
}
