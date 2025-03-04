import React from "react";
import Image from "next/image";

const Blogs = () => {
  const data = [
    {
      title: "10 Tips to Evaluate Unlisted Share Price Before Investing",
      image:
        "https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/679cac7e0e51ee769398493c_Checklist-for-investing-in-Unlisted-Equities-1-p-500.avif",
      description:
        "Investing in unlisted shares can be challenging, as these shares are not traded on stock exchanges and require careful evaluation....",
    },
    {
      title: "A Beginner's Guide to Buying Unlisted Shares in India",
      image:
        "https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/679cac743d1dc2e1cafce757_679ca5b2e573df26c838e759_116602-min-p-800.avif",
      description:
        "Investing in unlisted shares is gaining traction among investors in India. These shares belong to private companies that are not listed on prominent stock exchanges like the NSE (National Stock Exchange) or BSE (Bombay Stock Exchange).....",
    },
    {
      title: "Top Factors That Influence Unlisted Share Price in 2025",
      image:
        "https://cdn.prod.website-files.com/66dab781497d9a528975cd7a/679cac8bd306e05901ffadf9_679ca4e89ed402fd777e3440_18258-min-p-800-p-500.avif",
      description:
        "Unlisted shares are becoming more common as an investment option in Indian markets. Unlike listed shares, which are bought and sold on the stock exchange, unlisted shares don't have an easily accessible price.....",
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-medium text-center mt-30 mb-10">
        Our Blogs
      </h1>
      <p className="text-center w-9/12 text-gray-500">
        Our blog provides insightful information about unlisted shares, offering
        a deeper understanding of how these assets work, their potential
        benefits, and the risks involved. Whether you&apos;re new to unlisted
        shares or looking to expand your knowledge, we cover topics such as
        investment strategies, valuation methods, market trends, and regulatory
        aspects. Stay updated with expert tips and guides to navigate the
        unlisted share market effectively.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.map((card, index) => (
          <div key={index} className="rounded-lg p-4 hover:cursor-pointer">
            <div className="overflow-hidden rounded-4xl">
              <Image
                src={card.image}
                alt={card.title}
                className="object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                layout="responsive"
                width={500}
                height={300}
              />
            </div>
            <h2 className="text-xl font-semibold mt-2 py-2">{card.title}</h2>
            <p className="text-gray-600 mt-1">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
